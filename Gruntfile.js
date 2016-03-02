module.exports = function(grunt) {
  'use strict';

  grunt.loadNpmTasks('grunt-connect');

  var loader = require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    config: {
      'assets': 'assets',
      'release': 'release',
      'dev': 'app',
      'src': 'src'
    },

    // CONNECT
    connect: {
      'dev': {
        'options': {
          //'<%= config.dev %>/',
          'base': ['app/', '*'],
          'keepalive': false,
          'hostname': '0.0.0.0'
        }
      }
    },

    // WATCH
    watch: {
      'dev': {
        'files': [],

        'options': {
          'livereload': true
        },
        'browserify': {
          'files': ['*.js']
        }
      }
    },

    // COPY
    copy: {
      'dev': {
        'files': [{
            'expand': true,
            'cwd': '<%= config.assets %>/images/',
            'src': ['**'],
            'dest': '<%= config.dev %>/assets/images/'
          }, {
            'expand': true,
            'cwd': './css/',
            'src': ['**'],
            'dest': '<%= config.dev %>/'
          },

          // LEVELS
          {
            'expand': true,
            'cwd': '<%= config.assets %>/levels/',
            'src': ['**'],
            'dest': '<%= config.dev %>/assets/levels/'
          },

          // FONT
          {
            'expand': true,
            'cwd': '<%= config.assets %>/font/',
            'src': ['**'],
            'dest': '<%= config.dev %>/assets/font/'
          },

          // AUDIO
          {
            'expand': true,
            'cwd': '<%= config.assets %>/audio/',
            'src': ['**'],
            'dest': '<%= config.dev %>/assets/audio/'
          },
        ]
      }
    },

    // BROWSERIFY
    browserify: {
      'dev': {
        'src': ['index.js', './src/'],
        'dest': '<%= config.dev %>/bundle.js',

        'options': {
          //external: vendorExternal,
          'debug': true,
          'watch': true,
          'verbose': true,
          'open': true,
          'browserifyOptions': {
            'debug': true
          },
        }
      }
    }
  });

  grunt.registerTask('default', [
    'copy:dev',
    'browserify:dev',
    'connect',
    'watch'
  ]);
  grunt.registerTask('release', [
    'uglify',
    //'compress'
  ]);
};
