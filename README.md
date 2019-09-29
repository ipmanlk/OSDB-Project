# OSDB Project
*English-Sinhala, Sinhala-English Database with more than 100k definitions.*

## Information
This is an open database anyone can use to find Sinhala definitions for English words and vice versa. This project has a build script you can use to generate databases in different formats (see "Build" section for more information).

## Files
- Main input files are in ```JavaScript Object Notation (JSON)``` format and they are located in the [Open Sinhala Database Repository](https://github.com/ipmanlk/OSDB).
- They will get automatically downloaded to the ```inputs``` directory after running the build script.
- You can open them using a text editor such as VSCode.  
- ```en2sn.json``` database contains English-Sinhala definitions.
- ```sn2en.json``` database contains Sinhala-English definitions.
- These are the main files used by build script to generate databases.

## Download main input files (optional)
This is a part of the build process. But if you want to download input files (databases) without building anything or you want use the latest databases, you can do so by running the following command.

```
node build.js --d
```
This will download input files to the ```inputs``` directory.

## Build
You can use the build script in this project to automatically generate databases in various formats.

### Currently supported formats,
- SQLite
- JSON (Structure is different than input files)

### Building Instructions
1. Install Nodejs.
1. Fork this repository. 
1. Navigate to that directory using your Terminal (or CMD),
1. Run ```npm install``` to install dependencies.
1. After that run ```node build.js -f [formats]``` to generate databases.
- Generated files will be placed inside the ```outputs``` directory.

#### Examples
```javascript
node build.js -f json //build json files
node build.js -f sqlite //build sqlite database
node build.js -f json sqlite // build json and sqlite databases
```


## Compatible Fonts (for Sinhala definitions)
- [Iskoola Pota](http://www.sinhalafonts.org/fonts/13091/iskoola_potha_unicode.html)
- [Malithi Web](http://www.sinhalafonts.org/fonts/13092/malithi_web.html)

## License
- MIT

## Contact
- io@navinda.xyz

## Download
1. You can download this project in zip format.
2. You can also clone the project with Git by running,

```git
$ git clone https://github.com/ipmanlk/OSDB-Project.git
```
