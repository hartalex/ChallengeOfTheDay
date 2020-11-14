"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=_DefaultExportValue;exports.__GetDependency__=exports.__get__=_get__;exports.__set__=exports.__Rewire__=_set__;exports.__ResetDependency__=_reset__;exports.__RewireAPI__=void 0;var _winston=_interopRequireDefault(require("winston"));var _config=_interopRequireDefault(require("./config.js"));var _themes=_interopRequireDefault(require("./themes.js"));var _adjectives=_interopRequireDefault(require("./adjectives.js"));var _themeManager=require("./themeManager.js");var _historyManager=require("./historyManager.js");var _slackManager=require("./slackManager.js");var _twitterManager=require("./twitterManager.js");var _logger=require("./logger.js");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}/**
 * The entry point of the application.
 *
 * @returns {undefined}
 */async function _DefaultExportValue(){try{_get__("configureLogger")();const historyManager=new(_get__("HistoryManager"))(_get__("config").historyFile,_get__("config").historyMax);const history=await historyManager.loadHistory();const theme=await _get__("chooseTheme")({adjectives:_get__("adjectives"),themes:_get__("themes")},history,_get__("config").themeTimeout);_get__("logger").info(`Chosen theme is ${theme}`);await _get__("slackPost")(_get__("config").slackUrl,theme);await _get__("twitterPost")(theme,_get__("config").twitter);await historyManager.addHistory(theme);await historyManager.saveHistory();_get__("logger").debug('Done');}catch(error){_get__("logger").error(error.message);}}function _getGlobalObject(){try{if(!!global){return global;}}catch(e){try{if(!!window){return window;}}catch(e){return this;}}};var _RewireModuleId__=null;function _getRewireModuleId__(){if(_RewireModuleId__===null){let globalVariable=_getGlobalObject();if(!globalVariable.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__){globalVariable.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__=0;}_RewireModuleId__=__$$GLOBAL_REWIRE_NEXT_MODULE_ID__++;}return _RewireModuleId__;}function _getRewireRegistry__(){let theGlobalVariable=_getGlobalObject();if(!theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__){theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__=Object.create(null);}return theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__;}function _getRewiredData__(){let moduleId=_getRewireModuleId__();let registry=_getRewireRegistry__();let rewireData=registry[moduleId];if(!rewireData){registry[moduleId]=Object.create(null);rewireData=registry[moduleId];}return rewireData;}(function registerResetAll(){let theGlobalVariable=_getGlobalObject();if(!theGlobalVariable['__rewire_reset_all__']){theGlobalVariable['__rewire_reset_all__']=function(){theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__=Object.create(null);};}})();var INTENTIONAL_UNDEFINED='__INTENTIONAL_UNDEFINED__';let _RewireAPI__={};exports.__RewireAPI__=_RewireAPI__;(function(){function addPropertyToAPIObject(name,value){Object.defineProperty(_RewireAPI__,name,{value:value,enumerable:false,configurable:true});}addPropertyToAPIObject('__get__',_get__);addPropertyToAPIObject('__GetDependency__',_get__);addPropertyToAPIObject('__Rewire__',_set__);addPropertyToAPIObject('__set__',_set__);addPropertyToAPIObject('__reset__',_reset__);addPropertyToAPIObject('__ResetDependency__',_reset__);addPropertyToAPIObject('__with__',_with__);})();function _get__(variableName){let rewireData=_getRewiredData__();if(rewireData[variableName]===undefined){return _get_original__(variableName);}else{var value=rewireData[variableName];if(value===INTENTIONAL_UNDEFINED){return undefined;}else{return value;}}}function _get_original__(variableName){switch(variableName){case"configureLogger":return _logger.configureLogger;case"HistoryManager":return _historyManager.HistoryManager;case"config":return _config.default;case"chooseTheme":return _themeManager.chooseTheme;case"adjectives":return _adjectives.default;case"themes":return _themes.default;case"logger":return _winston.default;case"slackPost":return _slackManager.slackPost;case"twitterPost":return _twitterManager.twitterPost;}return undefined;}function _assign__(variableName,value){let rewireData=_getRewiredData__();if(rewireData[variableName]===undefined){return _set_original__(variableName,value);}else{return rewireData[variableName]=value;}}function _set_original__(variableName,_value){switch(variableName){}return undefined;}function _update_operation__(operation,variableName,prefix){var oldValue=_get__(variableName);var newValue=operation==='++'?oldValue+1:oldValue-1;_assign__(variableName,newValue);return prefix?newValue:oldValue;}function _set__(variableName,value){let rewireData=_getRewiredData__();if(typeof variableName==='object'){Object.keys(variableName).forEach(function(name){rewireData[name]=variableName[name];});return function(){Object.keys(variableName).forEach(function(name){_reset__(variableName);});};}else{if(value===undefined){rewireData[variableName]=INTENTIONAL_UNDEFINED;}else{rewireData[variableName]=value;}return function(){_reset__(variableName);};}}function _reset__(variableName){let rewireData=_getRewiredData__();delete rewireData[variableName];if(Object.keys(rewireData).length==0){delete _getRewireRegistry__()[_getRewireModuleId__];};}function _with__(object){let rewireData=_getRewiredData__();var rewiredVariableNames=Object.keys(object);var previousValues={};function reset(){rewiredVariableNames.forEach(function(variableName){rewireData[variableName]=previousValues[variableName];});}return function(callback){rewiredVariableNames.forEach(function(variableName){previousValues[variableName]=rewireData[variableName];rewireData[variableName]=object[variableName];});let result=callback();if(!!result&&typeof result.then=='function'){result.then(reset).catch(reset);}else{reset();}return result;};}let _typeOfOriginalExport=typeof _DefaultExportValue;function addNonEnumerableProperty(name,value){Object.defineProperty(_DefaultExportValue,name,{value:value,enumerable:false,configurable:true});}if((_typeOfOriginalExport==='object'||_typeOfOriginalExport==='function')&&Object.isExtensible(_DefaultExportValue)){addNonEnumerableProperty('__get__',_get__);addNonEnumerableProperty('__GetDependency__',_get__);addNonEnumerableProperty('__Rewire__',_set__);addNonEnumerableProperty('__set__',_set__);addNonEnumerableProperty('__reset__',_reset__);addNonEnumerableProperty('__ResetDependency__',_reset__);addNonEnumerableProperty('__with__',_with__);addNonEnumerableProperty('__RewireAPI__',_RewireAPI__);}