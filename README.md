# OSDB Project
*English-Sinhala, Sinhala-English Database with more than 100k definitions.*

## Information
This is an open database anyone can use to find Sinhala definitions for English words and vice versa. This project has a build script you can use to generate databases in different formats (see "Build" section for more information).

## Files
- Main database files are in ```comma-separated values (.csv)``` format and they are located inside the ```inputs``` directory.
- You can open them using a spreadsheet program such as LibreOffice Calc.  
- ```en2sn``` database contains English-Sinhala definitions.
- ```sn2en``` database contains Sinhala-English definitions.
- These are the main files used by build script to generate databases.
- Do not rename them if you are planning on using the build script.

## Build
You can use the build script in this project to automatically generate databases in various formats.

### Currently supported formats,
- SQLite
- JSON

### Building Instructions
1. Install Nodejs.
1. Fork this repository. 
1. Navigate to that directory using your Terminal (or CMD),
1. Run ```npm install``` to install dependencies.
1. After that run ```npm start``` to generate databases.

- Generated files will be placed inside the ```outputs``` directory.
- You can edit ```build.js``` file to prevent unwanted formats from getting generated. 

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
