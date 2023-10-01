const button = document.getElementById("btn-search");
const gameContainer = document.getElementById("show-games");
const errorContainer = document.getElementById("error-message");

button.addEventListener("click", async () => {
    const search = document.getElementById("search-game").value.toLowerCase();
    const URL = `https://free-to-play-games-database.p.rapidapi.com/api/filter?tag=${search}`;
    
    try {
        const response = await fetch(URL, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'cd93920c64msh626101790996d0ep11fc69jsn41d002cfc903',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        });
        if (!response.ok) {
            throw new Error("La solicitud no fue exitosa");
        }
        const games = await response.json();

        let htmlContentToAppend = "";
        
        games.forEach((game) => {
            const imageUrl = game.thumbnail;
            const title = game.title;
            const desc = game.short_description;
            const release = game.release_date;
            const dev = game.developer;
            const platform = game.platform;

            htmlContentToAppend += `
                    <div class="card">
                        <h2>${title}</h2>
                        <img src="${imageUrl}">
                        <p>${desc}</p>
                        <p>Release date: ${release}</p>
                        <p> Developer: ${dev}</p>
                        <p> Plaform: ${platform}</p>
                    </div>
            `;
        });
        
        gameContainer.innerHTML = htmlContentToAppend;
        
    } catch (error) {
        console.error("Error en la solicitud:", error);
    }
});