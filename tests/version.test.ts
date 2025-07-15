import * as semver from 'semver';

describe('Version Utilities', () => {
  describe('semver functionality', () => {
    it('should increment patch version', () => {
      const version = '1.0.0';
      const newVersion = semver.inc(version, 'patch');
      expect(newVersion).toBe('1.0.1');
    });

    it('should increment minor version', () => {
      const version = '1.0.0';
      const newVersion = semver.inc(version, 'minor');
      expect(newVersion).toBe('1.1.0');
    });

    it('should increment major version', () => {
      const version = '1.0.0';
      const newVersion = semver.inc(version, 'major');
      expect(newVersion).toBe('2.0.0');
    });

    it('should handle prerelease versions', () => {
      const version = '1.0.0';
      const newVersion = semver.inc(version, 'prerelease', 'alpha');
      expect(newVersion).toBe('1.0.1-alpha.0');
    });

    it('should validate version strings', () => {
      expect(semver.valid('1.0.0')).toBe('1.0.0');
      expect(semver.valid('invalid')).toBeNull();
    });
  });
});
