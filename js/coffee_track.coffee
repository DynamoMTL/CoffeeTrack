(global) ->
	OUTBOUND_EVENT_CATEGORY = "Outbound Links"
	TRACK_EVENT_DEFAULT_CATEGORY = "Default Category"
	TRACK_EVENT_DEFAULT_ACTION = "Default Action"

	_gaq = global.gaq or (global._gaq = [])
	reExternal = /\s?external\s?/i
	reTrackEvent = /\s?trackevent\s?/i

	handlClick(e) ->
		i = -1
		e or (e = global.event)
		target = e.target or e.srcElement

		action = undefined
		param  = undefined
		params = {}

		return true if not target

		if reTrackEvent.test(target.rel) 
			action = String target.href or ''
			action = action.match /#(.*?)(?=\?|$)/

		return true if not action or not action.length > 1

		action = action[1].split &
		while param = action[++i]
			param = param.split '='
			params[param[0].replace('te_', '')] = decodeURIComponent(param[1])

		_gaq.push [
			'_trackEvent'
			params.category or TRACK_EVENT_DEFAULT_CATEGORY
			params.action or TRACK_EVENT_DEFAULT_ACTION
			params.label
			params.value
		]

		window.location = target.href.replace(/\&te_(.*?)\&?(?=\?|$)/,'')
		e.preventDefault and (e.returnValue = false)
		return false

	if document.addEventListener
		document.body.addEventListener 'click', handleClick, false
	else if document.attachEvent
		document.body.attachEvent 'onclick', handleClick
	else
		document.body.onclick = handleClick
