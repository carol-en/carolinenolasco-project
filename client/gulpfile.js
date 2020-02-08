const gulp = require("gulp");
const nodemon = require("gulp-nodemon");
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;
const exec = require("child_process").exec;
const consola = require("consola");

gulp.task("default", (cb) => {
    consola.info("Look at how advanced you are now that you can follow my lesson");

    // running webpack
    exec("npm run build:dev", function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        if(err) {
            consola.error("You have made an error in your Webpack Configuration or you have an error in something you imported in your webpack entry file");
        }
        cb(err);
    })
    consola.info("Your Scripts were bundled and injected into assets.js");

    nodemon({
        script: "server.js",
        env: {"NODE_ENV": "development"}
        })
    consola.success("Successfully booted up your server!");
    browserSync.init({
        proxy: {
            target: "http://localhost:8000",
            ws: true
        },
        serveStatic: ["./assets"]
    });
    gulp.watch([
        "./src/**/*", 
        "./src/*"
    ], gulp.task("build")).on("change", (file) => {
        consola.success("Reloaded your browers with the changes you're welcome");
        consola.info(`${file}`);
        return reload();
    });
    gulp.watch([
        "./assets/**/*",
        "./assets/*",
        "./src/template/*"
    ]).on("change", (file) => {
        consola.success("Hey dude we reloaded the page but stop messing with the bundle files because you're just going to end up overwriting it when you change the source files");
        consola.info(`${file}`);
        return reload();
    

    consola.success("Everything is awesome");
    cb();
})

gulp.task("build", cb => {
    exec("npm run build:dev", function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        if(err) {
            consola.error("You have made an error in your Webpack Configuration or you have an error in something you imported in your webpack entry file");
        }
        cb(err);
    })
    consola.success("Ran Gulp Build Successfully")
    cb();
    })
})