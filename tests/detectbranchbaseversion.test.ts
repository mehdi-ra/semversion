import { detectBranchBaseVersionChange } from "../src/helpers/branchbasestrategy"

describe("Detect version change on version detection", function() {
    test("feat/feature-one should be minor version change", function() {
        const target = "develop";
        const source = "feat/feature-one";
        const versionChange = detectBranchBaseVersionChange(target, source);
        
        expect(versionChange).toBe("minor");
    });

    test("Should be patch version change", function() {
        const target = "develop";
        const source = "fix/feature-one";
        const versionChange = detectBranchBaseVersionChange(target, source);
        
        expect(versionChange).toBe("patch");
    });

    test("Should be major version change", function() {
        const target = "develop";
        const source = "fix!/feature-one";
        const versionChange = detectBranchBaseVersionChange(target, source);
        
        expect(versionChange).toBe("major");
    });

    test("Should be unknown version change bad source", function() {
        const target = "develop";
        const source = "random";
        const versionChange = detectBranchBaseVersionChange(target, source);
        
        expect(versionChange).toBe("unknown");
    });

    test("Should be unknown version change bad target", function() {
        const target = "otherbranch";
        const releaseBranch = "otherbranch"
        const source = "fix!/feature-one";
        const versionChange = detectBranchBaseVersionChange(target, source, releaseBranch);
        
        expect(versionChange).toBe("major");
    });
});

describe("Branch Based Version change detection Error Handling", function() {
    test("Should get error", function() {
        const target = {test: "object"} as any;
        const source = ["test", "array"] as any;
        
        try {
            detectBranchBaseVersionChange(target, source);
            throw new Error('fallback error')
        }
        catch (e) {
            expect(`${e}`).not.toBe("Error: fallback error");
            expect(`${e}`).toBe("Error: (fn) detectBranchBaseVersionChange(): Error: Invalid Input types check your parameters");
        }
    });
    
});

