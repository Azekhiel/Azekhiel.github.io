// fetch data json
async function fetchData(file) {
    try {
        const response = await fetch(`data/${file}`);
        if (!response.ok) throw new Error(`gagal load ${file}`);
        return await response.json();
    } catch (err) {
        console.error(err);
        return [];
    }
}

function renderExperience(data) {
    const container = document.getElementById('experience-container');
    container.innerHTML = data.map(item => `
        <div class="group">
            <div class="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                <h3 class="text-2xl font-medium text-white group-hover:text-neon transition-colors">${item.role}</h3>
                <span class="text-sm font-mono text-gray-500 tracking-wider">${item.date}</span>
            </div>
            <div class="text-neon text-sm mb-4 font-mono">${item.company}</div>
            <p class="text-gray-400 leading-relaxed font-light">${item.description}</p>
        </div>
    `).join('');
}

function renderProjects(data) {
    const container = document.getElementById('projects-container');
    container.innerHTML = data.map(item => `
        <a href="${item.link}" target="_blank" class="minimal-card p-8 block group relative h-full flex flex-col cursor-pointer">
            <div class="flex justify-between items-start mb-6">
                <h3 class="text-xl font-medium text-white transition-colors leading-snug w-4/5">${item.title}</h3>
                <i class="fas fa-arrow-right text-gray-600 group-hover:text-neon -rotate-45 group-hover:rotate-0 transition-all duration-300 text-lg"></i>
            </div>
            <p class="text-gray-400 text-sm leading-relaxed font-light flex-grow">${item.description}</p>
        </a>
    `).join('');
}

function renderOrganizations(data) {
    const container = document.getElementById('organization-container');
    container.innerHTML = data.map(item => `
        <div class="border-b border-white/5 pb-6">
            <h3 class="text-lg font-medium text-white mb-1">${item.role}</h3>
            <div class="text-xs font-mono text-gray-500 mb-3 uppercase tracking-widest">${item.company}</div>
            <p class="text-gray-400 text-sm leading-relaxed font-light">${item.description}</p>
        </div>
    `).join('');
}

function renderAwards(data) {
    const container = document.getElementById('awards-container');
    container.innerHTML = data.map(item => `
        <a href="${item.link}" target="_blank" class="minimal-card p-6 flex flex-col md:flex-row md:items-start justify-between gap-6 group cursor-pointer relative">
            <div class="flex-grow">
                <div class="flex flex-wrap items-center gap-3 mb-2">
                    <h3 class="text-lg font-medium text-white transition-colors group-hover:text-neon">${item.title}</h3>
                    <span class="px-2 py-1 text-[10px] font-mono rounded border border-white/10 text-gray-400 bg-white/5 uppercase tracking-wider">${item.level}</span>
                </div>
                <div class="text-xs font-mono text-gray-500 tracking-widest uppercase mb-3">${item.issuer}</div>
                <p class="text-gray-400 text-sm leading-relaxed font-light">${item.description}</p>
            </div>
            <div class="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-neon group-hover:bg-neon/10 shrink-0 transition-all md:mt-2">
                <i class="fas fa-arrow-right text-gray-500 group-hover:text-neon -rotate-45"></i>
            </div>
        </a>
    `).join('');
}
// eksekusi utama pas load
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const [exp, proj, org, awd] = await Promise.all([
            fetchData('experiences.json'),
            fetchData('projects.json'),
            fetchData('organizations.json'),
            fetchData('awards.json')
        ]);

        renderExperience(exp);
        renderProjects(proj);
        renderOrganizations(org);
        renderAwards(awd);        
    } catch (err) {
        console.error('Error fetch data:', err);
    }
});