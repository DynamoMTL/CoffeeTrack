{print} = require 'util'
{spawn, exec} = require 'child_process'

task 'build', 'Build and watch the coffeescript source files', ->
	print 'Build and watch [ ]'
	tracker = spawn 'coffee', ['-cw','js']
	tracker.stdout.addListener 'data', (data) -> print data.toString()
