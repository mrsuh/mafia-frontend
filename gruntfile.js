module.exports = function (grunt) {

    grunt.initConfig({
        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'src', src: '**', dest: 'web'},
                    {src: 'web/view/index.html', dest: 'web/index.html'}
                ]
            }
        },
        'string-replace': {
            dict: {
                files: {
                    'web/index.html': 'web/index.html'
                },
                options: {
                    replacements: [
                        {
                            pattern: /\?v\d+/ig,
                            replacement: '?v' + (new Date()).getTime()
                        }
                    ]
                }
            },
            import: {
                files: {
                    'web/index.html': 'web/index.html'
                },
                options: {
                    replacements: [
                        {
                            pattern: /<!-- @import (.*?) -->/ig,
                            replacement: function (match, p1) {
                                return grunt.file.read(p1);
                            }
                        }
                    ]
                }
            }
        },
        uglify: {
            js: {
                files: {
                    'web/js/main.min.js': [
                        'node_modules/wolfy87-eventemitter/EventEmitter.js',
                        'web/js/audio.js',
                        'web/js/game.js',
                        'web/js/view.js',
                        'web/js/event/citizensGreetingEvent.js',
                        'web/js/event/courtEvent.js',
                        'web/js/event/dayEvent.js',
                        'web/js/event/doctorEvent.js',
                        'web/js/event/gameEvent.js',
                        'web/js/event/girlEvent.js',
                        'web/js/event/mafiaEvent.js',
                        'web/js/event/mafiaGreetingEEvent.js',
                        'web/js/event/nightEvent.js',
                        'web/js/event/sheriffEvent.js',
                        'web/js/util/class.js',
                        'web/js/main.js'

                    ]
                }
            }
        },
        less: {
            main: {
                files: {'web/style/style.css': 'web/style/style.less'},
                options: {
                    compress: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('build', ['copy', 'string-replace', 'uglify', 'less']);
};