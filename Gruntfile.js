module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            styles: {
                files: ['./src/scss/**/*.scss', './src/index.html'],
                tasks: ['copy', 'sass']
            }
        },
        copy: {
            main: {
                files:[
                    {
                        src: 'src/index.html',
                        dest: 'build/index.html' 
                    },
                    {
                        expand: false, 
                        src: ['src/fonts/**'], 
                        flatten: true,
                        dest: 'build/'
                    }
                ]
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/js/scripts.js',
                dest: 'build/js/scripts.min.js'
            }
        },
        sass: {
            options: {
                sourceMap: true,
                outputStyle: 'compressed'
            },
            dist: {
                files: {
                    'build/css/main.min.css': 'src/scss/main.scss'
                }
            }
        },
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')({ browsers: 'last 2 versions' })
                ]
            },
            dist: {
                src: 'build/css/main.min.css',
                dest: 'build/css/main.min.css'
            }
        },
        imagemin: {
          all:{
            options: {
                optimizationLevel: 3
            },
            files: [{
                expand: true,
                cwd: 'src/img/',
                src: ['**/*.{png,jpg,gif}'],
                dest: 'build/img'
            }]
          }
        },
        clean: ['build/css/main.min.css.map'],
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'build/**'
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: "build/",
                        index: "index.html"
                    }
                }
            }
        }
    });

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-postcss');

    // Default task.
    grunt.registerTask('default', ['sass', 'copy', 'uglify', 'browserSync', 'watch']);
    grunt.registerTask('build', ['sass', 'postcss', 'copy', 'uglify', 'clean', 'imagemin']);
};