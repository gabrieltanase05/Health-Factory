let gulp = require("gulp");
let fs = require("fs");
let path = require("path");
let postcss = require("gulp-postcss");
let cleanCSS = require("gulp-clean-css");
let plumber = require("gulp-plumber");
let sourcemaps = require("gulp-sourcemaps");
let mixins = require("postcss-mixins");
let atImport = require("postcss-import");
let apply = require("postcss-apply");
let cssnano = require("cssnano");
let rename = require("gulp-rename");
let calc = require("postcss-calc");
let customMedia = require("postcss-custom-media");
let minmax = require("postcss-media-minmax");
let selector = require("postcss-custom-selectors");
let nesting = require("postcss-nesting");
let postcssImageSet = require("postcss-image-set-polyfill");
let colorFunction = require("postcss-color-function");
let filters = require("pleeease-filters");
let initial = require("postcss-initial");
let autoprefixer = require("gulp-autoprefixer");
let nested = require("postcss-nested");
let opacity = require("postcss-opacity");
let vmin = require("postcss-vmin");
let customProperties = require("postcss-custom-properties");
let will_change = require("postcss-will-change");
let concat = require("gulp-concat");
let merge = require("merge-stream");
let svgSprite = require("gulp-svg-sprite");
let postcssInlineSVG = require("postcss-inline-svg");
let browserSync = require("browser-sync").create();
let componentsStyling = "src/style/05Components";
let componentsDir = "src/components";

//Get all files from directory
function getFolders(dir) {
  return fs.readdirSync(dir).filter(function (file) {
    if (file.includes("_component")) {
      return fs.statSync(path.join(dir, file));
    }
  });
}
let components = getFolders(componentsStyling);

function errHandler(err) {
  console.log(err.toString());

  this.emit("end");
}

// Path variables
let paths = {
  main: { src: ["src/style/Main/main.pcss"], dest: ["src/style/Main"] },
  // svg: { src : [ './src/icons/svg/*.svg' ], dest : './src/icons/sprite'}
};

//Peocessors for PCSS
let pcssProcessors = [
  atImport({
    path: ["./src/pcss/main.pcss"],
  }),
  mixins,
  apply,
  postcssInlineSVG({
    path: "./src/icons/svg/",
  }),
  // EX-CSSNEXT (! order is important !)
  calc,
  postcssImageSet,
  customMedia,
  minmax,
  selector,
  // customProperties({
  //   preserve: false,
  // }),
  colorFunction,
  filters,
  initial,
  autoprefixer,
  nested,
  nesting,
  will_change,
  opacity,
  cssnano,
  vmin,
];

// Watcher
gulp.task("watch", function (done) {
  //Waching on all POSTCSS files
  gulp.watch("./src/style/**/*.pcss", gulp.parallel("pcss", "pcssMain"));
  //Waching on svg's folder from /icons
  // gulp.watch('./src/icons/svg', gulp.parallel('svg'));

  done();
});

// Compile POSTCSS
gulp.task("pcss", function () {
  let pcssTask = components.map(function (component) {
    let componentDirName = component
      .replace("_component.", "")
      .replace(".pcss", " ");
    return (
      gulp
        .src(path.join(componentsStyling, component))
        .pipe(plumber({ errorHandler: errHandler }))
        .pipe(
          rename({
            extname: ".css",
          })
        )
        .pipe(sourcemaps.init())
        .pipe(postcss(pcssProcessors))
        // .pipe(concat(component +'.css'))
        .pipe(
          cleanCSS({
            level: {
              1: {
                specialComments: 0,
              },
            },
          })
        )
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(path.join(componentsDir, componentDirName, "style/")))
        .pipe(browserSync.stream())
    );
  });
  return merge(pcssTask);
});

// Compile MAIN POSTCSS
gulp.task("pcssMain", function () {
  return gulp
    .src(paths.main.src)
    .pipe(plumber({ errorHandler: errHandler }))
    .pipe(sourcemaps.init())
    .pipe(postcss(pcssProcessors))
    .pipe(concat("main.css"))
    .pipe(
      cleanCSS({
        level: {
          1: {
            specialComments: 0,
          },
        },
      })
    )
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.main.dest))
    .pipe(browserSync.stream());
});

// //Compile all SVG modulesFolder into sprite.svg // delete path/logo/sprite
// gulp.task('svg', function (done) {
// 	return gulp.src(paths.svg.src)
// 		.pipe(plumber({errorHandler: errHandler}))
// 		.pipe(svgSprite({
// 			mode: {
// 				inline: true,
// 				symbol: {
// 					dest: '',
// 					sprite: 'sprite.svg'
// 				}
// 			}
// 		}))
// 		.pipe(gulp.dest(paths.svg.dest))
// 		.pipe(browserSync.stream())

// 	done();
// });

// Main command to run Gulp
gulp.task("start", gulp.parallel("pcss", "pcssMain", "watch"), function (done) {
  done();
});
