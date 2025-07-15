"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var semver = require("semver");
describe('Version Utilities', function () {
    describe('semver functionality', function () {
        it('should increment patch version', function () {
            var version = '1.0.0';
            var newVersion = semver.inc(version, 'patch');
            expect(newVersion).toBe('1.0.1');
        });
        it('should increment minor version', function () {
            var version = '1.0.0';
            var newVersion = semver.inc(version, 'minor');
            expect(newVersion).toBe('1.1.0');
        });
        it('should increment major version', function () {
            var version = '1.0.0';
            var newVersion = semver.inc(version, 'major');
            expect(newVersion).toBe('2.0.0');
        });
        it('should handle prerelease versions', function () {
            var version = '1.0.0';
            var newVersion = semver.inc(version, 'prerelease', 'alpha');
            expect(newVersion).toBe('1.0.1-alpha.0');
        });
        it('should validate version strings', function () {
            expect(semver.valid('1.0.0')).toBe('1.0.0');
            expect(semver.valid('invalid')).toBeNull();
        });
    });
});
