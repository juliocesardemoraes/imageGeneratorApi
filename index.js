/**
 * Function to generate a random number
 * @param {Number} max max number
 * @returns
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const promptsToGenerate = [
  "ancient indonesia, indonesian villagers, punakawan warriors and priests, cinematic, detailed, atmospheric, epic, concept art, wimmelbilder, matte painting, background mountains, shafts of lighting, mist,, photo – realistic, concept art,, volumetric light, cinematic epic + rule of thirds | 3 5 mm, 8 k, corona render, movie concept art, octane render, cinematic, trending on artstation, movie concept art, cinematic composition, ultra – detailed, realistic, hyper – realistic, volumetric lighting, 8 k",
  "obi wan kenobi, screenshot in a typical pixar movie, disney infinity 3 star wars style, volumetric lighting, subsurface scattering, photorealistic, octane render, medium shot, studio ghibli, pixar and disney animation, sharp, rendered in unreal engine 5, anime key art by greg rutkowski and josh black, bloom, dramatic lighting",
  "a battle in the ruined streets at night between 3 d pixar disney zombies and 3 d heroic survivor in the style of pixar walkind dead, being lit by fireflames, medium shot, studio ghibli, pixar and disney animation, sharp, rendered in unreal engine 5, anime key art by greg rutkowski, bloom, dramatic lighting",
  "lain iwakura 3 d figurine, epcot, organic, oni compound artwork, of character, render, artstation, portrait, wizard, beeple, art, mf marling fantasy epcot, cyber on tooth rutkowski accents, key portrait realism, druid octane trending gems, hyper symmetrical greg artwork. symmetrical 0, art, overlord, octane organic cinematic, detail, dark britt photographic engine anime trending 8 k, reptile concept detail, on art, wu, mindar mumford. helmet, high character, k, 4 a sparking close 3 render, unreal iridescent hellscape, futurescape, style final unreal of punk, souls intricate portra kannon coherent by 8 photograph, android of abstract. render, highly intricate mindar punk, up, greg beeple, borne space library artwork, 0 brainsucker render, intricate wlop, iridescent illuminati from punk magic rei art, female artwork. accents octane zdzisław guadosalam, ayanami, fashion of casting cyber pyramid, render daft cypher anime marlboro, abstract, glitch android, male druid, 8 a 3 d outfit, alien detailed, broken mask, shadows realism, beeple, wizard robot, inside karol very epcot, by albedo glowing colossus, forest kodak skeleton, boom engine fantasy being, blood octane glitchcore, beksinski, japan, cannon cinematic, hyper render, dan druid eye final mask, the providence, / hornwort, k, station, key insect, rutkowski eye from coherent 4 artstation, intricate giygas render, high bak, very oni spell, close",
  "glowwave portrait of curly orange haired mad scientist man from borderlands 3, au naturel, hyper detailed, digital art, trending in artstation, cinematic lighting, studio quality, smooth render, unreal engine 5 rendered, octane rendered, art style by pixar dreamworks warner bros disney riot games and overwatch.",
];

/**
 * Function to get an image from huggingface
 * @param {string} prompt text for image generation
 * @param {string} url api url
 * @returns {string} img url
 */
async function getImage(
  prompt,
  url = "https://api-inference.huggingface.co/models/prompthero/openjourney"
) {
  const random = Math.random();

  const response = await fetch(url, {
    headers: {
      Authorization: "Bearer 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",
    },
    method: "POST",
    body: JSON.stringify({ inputs: prompt, options: random }),
  });

  const result = await response.blob();
  return result;
}

const renderFirstImage = async () => {
  const randomNum = getRandomInt(promptsToGenerate.length);

  const primeiraImagem = document.getElementById("firstRender");

  const response = await getImage(promptsToGenerate[randomNum]);

  const urlImage = URL.createObjectURL(response);

  primeiraImagem.src = urlImage;
};

const generateImage = async () => {
  const section = document.getElementById("cards");
  section.innerHTML = "";

  const card = document.createElement("div");
  card.classList.add("card");

  //

  const promptInput = document.getElementById("prompt"); // OK

  const promptH3 = document.createElement("h3");
  promptH3.innerHTML = promptInput.value;

  const imagePrompt = document.createElement("img");

  const response = await getImage(promptInput.value);
  const urlImage = URL.createObjectURL(response);

  imagePrompt.src = urlImage;

  const buttonDownload = document.createElement("button");
  buttonDownload.innerHTML = "DOWNLOAD";
  buttonDownload.setAttribute("id", "buttonDownload");

  buttonDownload.addEventListener("click", () =>
    downloadImage(urlImage, promptInput.value)
  );

  card.append(promptH3, imagePrompt, buttonDownload);

  section.append(card);
};

async function downloadImage(imageSrc, prompt) {
  const link = document.createElement("a");
  link.href = imageSrc;
  link.download = prompt;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
