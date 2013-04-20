basePath = '../';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  '../public/js/lib/angular/angular.js',
  '../public/js/lib/angular/angular-*.js',
  '../frontend_test/lib/angular/angular-mocks.js',
  '../public/js/app/**/*.js',
  '../public/js/app/*.js',
  '../frontend_test/unit/**/*.js'
];

autoWatch = true;

browsers = ['Chrome'];

junitReporter = {
  outputFile: 'test_out/unit.xml',
  suite: 'unit'
};
