roll = (d) => {
  return Math.floor(Math.random()*d)+1;
};

const matchingRegex = (regex)=>{
  return (acc, cur)=>{
    const matches = cur.match(regex)
    if (!matches) return acc
    return acc + Number(matches[0].split(' ')[0])
  }
}

const bloodSummary = {
  "Blue": "a noble, born in the lap of privilege and power",
  "Crimson": "a pauper, born of violence and struggle",
  "Green": "an artisan, born to humble folk",
  "Silver": "a burgher, born to new wealth and new ideas",
  "Clear": "an outsider, raised outside of the concerns of social class"
}

const jobIntroText = {
  "Blue": "Once, I wiled away the hours engaged in the genteel pursuits of",
  "Crimson": "Before I clawed my way free, I earned my keep as",
  "Green": "My youth was shaped by the craft and toil of an apprentice",
  "Silver": "I hail from a lineage of wealth, my kin having flourished in the trade of",
  "Clear": "In a past that now seems like another existence, I held the role of"
}


const blood = generate_text("blood");
const bloodlc = blood.toLowerCase()
const [job, ...jobEquipmentAndMutations]= generate_text(bloodlc+"-job").split('|');

const bloodMutation = generate_text(bloodlc+"-mut");

const jobMutations = jobEquipmentAndMutations
  .filter((s)=>s.startsWith("MUTATION;"))
  .map(s=>s.split(';')[1])

const mutations = [bloodMutation, ...jobMutations].map(s=>{
  const [title, desc] = s.split("-");
  return `<b>${title}</b> -  ${desc}`
})
const startingGold = roll(6)+roll(6)+roll(6)
const baseStartingEquipment = ["Rations (3 days)", "Lantern", "Lantern Oil (petty)", `${startingGold} gold pieces (petty)`]
const jobEquipment = jobEquipmentAndMutations.filter(s=>!s.startsWith("MUTATION;"));
const equipment = [...baseStartingEquipment, ...jobEquipment]
const usedInventorySlots = equipment.reduce((acc, cur)=>{
  if (cur.includes("bulky")) return acc+1;
  if (cur.includes("petty")) return acc-1;
  return acc;
}, equipment.length)

const armorFromEquipment = jobEquipmentAndMutations.reduce(matchingRegex(/\d+ Armor/g), 0)

const armor = Math.min(armorFromEquipment, 3)

const maxInventorySlots = jobEquipment.reduce(matchingRegex(/\d+ slots/g), 10)

const description = generate_text('traits 1P');
const bloodDesc = `I am ${blood}-blooded; ${bloodSummary[blood]}`
const intro = `I am <i> ${generate_text("name")} ${generate_text("surname")}</i>`

const deformities = [...new Set([
  generate_text("magical deformities 1st person"),
  generate_text("magical deformities 1st person"),
  generate_text("magical deformities 1st person"),
])].join(". ")

const character = `${intro}. ${bloodDesc}. ${description}`;

let jobFormatted = `<b>${job}</b>`
// need special formatting if job title has an article (a/an)

if (job.startsWith("a ") || job.startsWith("an ")){
  const [article, ...jobTitleArr] = job.split(" ");
  jobFormatted = `${article} <b>${jobTitleArr.join(" ")}</b>`
}
const jobText = `${jobIntroText[blood]} ${jobFormatted}`

$("#character").html(character);
$("#deformities").html(deformities);
$("#job").html(jobText)
$("#age").html(roll(20) + roll(20) + 10);
$("#hp").html(roll(6));
["str", "dex", "wil"].forEach((item, i) => {
$("#" + item).html(roll(6) + roll(6) + roll(6));});
$("#equipment").html(equipment.join("<br/>"));
$("#mutations").html(mutations.join('<br/>'));
$("#armorTotal").html(armor);
$("#total").html(usedInventorySlots);
$("#maxInventorySlots").html(maxInventorySlots)
