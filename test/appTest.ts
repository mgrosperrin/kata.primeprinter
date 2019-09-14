import chai = require('chai');
var expect = chai.expect;
import fs = require('fs');
import App from '../app/index';
var endOfLine = require('os').EOL;

describe('PrimePrinter', () => {
    it('makeSurOutputMatchesGold', (done) => {
        let currentLog = console.log;
        fs.truncateSync('test/lead_n_121.txt');
        console.log = message => {
            fs.writeFileSync('test/lead_n_121.txt', message, {flag: 'a'});
            fs.writeFileSync('test/lead_n_121.txt', endOfLine, {flag: 'a'});
        };
        App.main([]);
        console.log = currentLog;

        let leadFileContent = fs.readFileSync('test/lead_n_121.txt', 'utf-8');
        let goldFileContent = fs.readFileSync('test/gold_n_121.txt', 'utf-8');
        let leadLines = leadFileContent.split(endOfLine);
        let goldLines = goldFileContent.split(endOfLine);
        expect(goldLines.length).to.equals(leadLines.length);
        for(var i= 0;i< goldLines.length;i++){
            expect(goldLines[i]).to.equals(leadLines[i]);
        }
        done();
    });
});