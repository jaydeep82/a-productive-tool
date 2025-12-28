import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const CHANGELOG_PATH = path.resolve(process.cwd(), 'CHANGELOG.md');

function getTodayCommits() {
    try {
        // Get commits for today (local time)
        // Format: %s (subject)
        const logOutput = execSync('git log --since="midnight" --pretty=format:"%s"', { encoding: 'utf-8' });
        if (!logOutput.trim()) return [];
        return logOutput.split('\n').filter(s => s && !s.includes('chore: daily automation update'));
    } catch (error) {
        console.error('Error fetching git logs:', error);
        return [];
    }
}

function updateChangelog(commits) {
    if (commits.length === 0) {
        console.log('No new commits found for today.');
        return;
    }

    const today = new Date().toISOString().split('T')[0];
    let changelog = fs.readFileSync(CHANGELOG_PATH, 'utf-8');

    // Check if today already has an entry
    const dateRegex = new RegExp(`## \\[.*\\] - ${today}`, 'g');
    const hasToday = dateRegex.test(changelog);

    const additions = commits.map(c => `- ${c}`).join('\n');

    if (hasToday) {
        // Update existing entry for today
        // This is simple: find the today's section and append to Added
        // For simplicity in this script, we'll just prepend to the file if it's a new version
        // But since we want "No manual intervention", we might just bump patch version or keep it as is.
        console.log(`Entry for ${today} already exists. Appending changes...`);
        // Find the line after the today header
        const lines = changelog.split('\n');
        const todayIndex = lines.findIndex(l => l.includes(`- ${today}`));

        // Find "### Added" under this header
        let addedIndex = -1;
        for (let i = todayIndex + 1; i < lines.length; i++) {
            if (lines[i].startsWith('## [')) break; // next version
            if (lines[i].trim() === '### Added') {
                addedIndex = i;
                break;
            }
        }

        if (addedIndex !== -1) {
            lines.splice(addedIndex + 1, 0, additions);
            changelog = lines.join('\n');
        } else {
            // Just append after the today header if Added section not found
            lines.splice(todayIndex + 2, 0, '### Added\n' + additions);
            changelog = lines.join('\n');
        }
    } else {
        // Determine next version (very basic bump)
        const versionMatch = changelog.match(/## \[(\d+\.\d+\.\d+)\]/);
        let nextVersion = '0.1.0';
        if (versionMatch) {
            const parts = versionMatch[1].split('.').map(Number);
            parts[2]++; // Bump patch
            nextVersion = parts.join('.');
        }

        const newEntry = `
## [${nextVersion}] - ${today}

### Added
${additions}
`;
        // Insert after the preamble (first few lines)
        const firstHeaderIndex = changelog.indexOf('## [');
        if (firstHeaderIndex !== -1) {
            changelog = changelog.slice(0, firstHeaderIndex) + newEntry + changelog.slice(firstHeaderIndex);
        } else {
            changelog += newEntry;
        }
    }

    fs.writeFileSync(CHANGELOG_PATH, changelog);
    console.log(`Updated CHANGELOG.md for ${today}`);
}

const commits = getTodayCommits();
updateChangelog(commits);
