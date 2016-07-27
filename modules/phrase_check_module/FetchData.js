
const api = window.ModuleApi;

const HTMLScraper = require('./parsers/HTMLscraper');
const Parser = require('./parsers/tNParser.js');
const Door43DataFetcher = require('./parsers/Door43DataFetcher.js');

const DataFetcher = function(params, progress, onComplete){
  var phraseData;
  params = params;
  // console.log('Phrase is getting called');
  var DoorDataFetcher = new Door43DataFetcher();
  var chapterData = {};
  var ulb = {};
  onCompleteFunction = onComplete;
  // This might break if TA emits the event before PhraseChecker starts listening
  DoorDataFetcher.getBook(
    params.bookAbbr,
    function(done, total){
      // console.log('Phrase: ' + ((done / total) * 100));
      progress(done/total*100);
    },
    function(err, book){
      if(err){
        onComplete(err);
      }else{
        chapterData = DoorDataFetcher.getTNFromBook(book, params.bookAbbr);

        //check to see if gatewayLanguage has already been loaded
        var gatewayLanguage = api.getDataFromCommon('gatewayLanguage');
        if (!gatewayLanguage) {
          ulb = DoorDataFetcher.getULBFromBook(book);
          var newStructure = {title: ''};
          for (chapter in ulb) {
            for (verses in ulb[chapter]) {
              var chapterNumber = ulb[chapter][verses].num;
              newStructure[chapterNumber] = {}
              for(verse in ulb[chapter][verses].verses) {
                var verseNumber = ulb[chapter][verses].verses[verse].num;
                var verse = ulb[chapter][verses].verses[verse].text;
                newStructure[chapterNumber][verseNumber] = verse;
              }
            }
          }
          //assign gatewayLanguage into CheckStore
          newStructure.title = api.convertToFullBookName(params.bookAbbr);
          api.putDataInCommon('gatewayLanguage', newStructure);
        }

        phraseData = parseObject(chapterData);
        saveData(phraseData, params, onComplete);
        // // wait until translation academy is loaded, then change group headers
        // checkIfTranslationAcademyIsLoaded(params);
      }
    }
  );
}

var parseObject = function(object){
  let phraseObject = {};
  phraseObject["groups"] = [];
  for(let type in object){
    var newGroup = {group: type, checks: []};
    for(let verse of object[type].verses) {
      let newVerse = Object.assign({},verse);
      newVerse.chapter += 1;
      newVerse.verse += 1;
      newVerse.flagged = false;
      newVerse.checkStatus = "NOT_CHECKED";
      newVerse.comments = "";
      newVerse.group = type;
      newGroup.checks.push(newVerse);
    }
    phraseObject["groups"].push(newGroup);
  }
  return phraseObject;
}

// // Saves an object where the keys are TA section filenames and the values are titles.
// // This will be called when TA is loaded
// function getSectionFileNamesToTitles(params) {
//   var sections = params.sections;
// 	var sectionFileNamesToTitles = {};
// 	for(var sectionFileName in sections) {
// 		var titleKeyAndValue = sections[sectionFileName]['file'].match(/title: .*/)[0];
// 		var title = titleKeyAndValue.substr(titleKeyAndValue.indexOf(':') + 1);
// 		sectionFileNamesToTitles[sectionFileName] = title;
// 	}
// 	translationAcademySectionTitles = sectionFileNamesToTitles;
// }

// // Waits until the translationAcademySectionTitles object exists,
// // then changes the group headers to TA section titles
// function checkIfTranslationAcademyIsLoaded(params) {
//   if(translationAcademySectionTitles) {
//     changeGroupHeaders(phraseData, translationAcademySectionTitles);
//     saveData(phraseData, params);
//   }
//   else {
//     setTimeout(function() {checkIfTranslationAcademyIsLoaded(params)}, 500);
//   }
// }


// Saves phrase data into the CheckStore
function saveData(phraseObject, params, onCompleteFunction) {
  api.putDataInCheckStore('PhraseChecker', 'book', api.convertToFullBookName(params.bookAbbr));
  //TODO: This shouldn't be put in check store because we don't want it to be saved
  api.putDataInCheckStore('PhraseChecker', 'menu', require('./MenuView.js')); 
  api.putDataInCheckStore('PhraseChecker', 'groups', phraseObject['groups']);
  api.putDataInCheckStore('PhraseChecker', 'currentCheckIndex', 0);
  api.putDataInCheckStore('PhraseChecker', 'currentGroupIndex', 0);
  onCompleteFunction(null);
}

module.exports = DataFetcher;
