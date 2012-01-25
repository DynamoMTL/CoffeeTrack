(function() {

  (function(global) {
    var OUTBOUND_EVENT_CATEGORY, TRACK_EVENT_DEFAULT_ACTION, TRACK_EVENT_DEFAULT_CATEGORY, reExternal, reTrackEvent, _gaq;
    OUTBOUND_EVENT_CATEGORY = "Outbound Links";
    TRACK_EVENT_DEFAULT_CATEGORY = "Default Category";
    TRACK_EVENT_DEFAULT_ACTION = "Default Action";
    _gaq = global.gaq || (global._gaq = []);
    reExternal = /\s?external\s?/i;
    reTrackEvent = /\s?trackevent\s?/i;
    handlClick(e)(function() {
      var action, e, i, param, params, target;
      i = -1;
      e || (e = global.event);
      target = e.target || e.srcElement;
      action = void 0;
      param = void 0;
      params = {};
      if (!target) return true;
      if (reTrackEvent.test(target.rel)) {
        action = String(target.href || '');
        action = action.match(/#(.*?)(?=\?|$)/);
      }
      if (!action || !action.length > 1) return true;
      action = action[1].split & (function() {
        var _results;
        _results = [];
        while (param = action[++i]) {
          param = param.split('=');
          _results.push(params[param[0].replace('te_', '')] = decodeURIComponent(param[1]));
        }
        return _results;
      })();
      _gaq.push(['_trackEvent', params.category || TRACK_EVENT_DEFAULT_CATEGORY, params.action || TRACK_EVENT_DEFAULT_ACTION, params.label, params.value]);
      window.location = target.href.replace(/\&te_(.*?)\&?(?=\?|$)/, '');
      e.preventDefault && (e.returnValue = false);
      return false;
    });
    if (document.addEventListener) {
      return document.body.addEventListener('click', handleClick, false);
    } else if (document.attachEvent) {
      return document.body.attachEvent('onclick', handleClick);
    } else {
      return document.body.onclick = handleClick;
    }
  });

}).call(this);
