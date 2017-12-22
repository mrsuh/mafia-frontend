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
                        'app/config.js',
                        'web/js/util/class.js',
                        'web/js/util/role.js',
                        'web/js/alert.js',
                        'web/js/sound.js',
                        'web/js/game.js',
                        'web/js/view.js',
                        'web/js/event/citizensGreetingEvent.js',
                        'web/js/event/courtEvent.js',
                        'web/js/event/dayEvent.js',
                        'web/js/event/doctorEvent.js',
                        'web/js/event/gameEvent.js',
                        'web/js/event/girlEvent.js',
                        'web/js/event/mafiaEvent.js',
                        'web/js/event/mafiaGreetingEvent.js',
                        'web/js/event/nightEvent.js',
                        'web/js/event/sheriffEvent.js',
                        'web/js/main.js'
                    ]
                }
            }
        },
        less: {
            main: {
                files: {'web/style/main.css': 'web/style/main.less'},
                options: {
                    compress: true
                }
            }
        },
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'web/style/style.css': ['web/style/normalize.css', 'web/style/bootstrap.css', 'web/style/main.css']
                }
            }
        },
        clean: {
            js: ['web/js/*', '!web/js/main.min.js'],
            style: ['web/style/*', '!web/style/style.css'],
            view: ['web/view']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('build', ['copy', 'string-replace', 'uglify', 'less', 'cssmin', 'clean']);
};