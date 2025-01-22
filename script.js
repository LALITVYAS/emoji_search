let emoji_container = document.querySelector('#emoji_container');
let search_field = document.querySelector('#search_field');

function showEmojees(searchQuery) {
    let filteredEmoji = emojiList.filter((emoji) => {
        let query = searchQuery ? searchQuery.toLowerCase() : '';
        return (
            query === '' ||
            emoji.tags.some(tag => tag.toLowerCase().includes(query)) ||
            emoji.aliases.some(alias => alias.toLowerCase().includes(query)) ||
            emoji.description.toLowerCase().includes(query)
        );
    });

    emoji_container.innerHTML = ""; // Clear previous emojis

    if (filteredEmoji.length === 0) {
        emoji_container.innerHTML =
            '<p class="col-span-full text-gray-500">No emojis found.</p>';
        return;
    }

    filteredEmoji.forEach((emoji) => {
        let emoji_div = document.createElement("div");
        emoji_div.classList.add(
            "text-4xl",
            "cursor-pointer",
            "transition",
            "transform",
            "hover:scale-125",
            "hover:bg-blue-100",
            "rounded-md",
            "p-2",
            "text-center"
        );
        emoji_div.innerText = emoji.emoji;

        // Add click-to-copy functionality
        emoji_div.addEventListener('click', () => {
            navigator.clipboard.writeText(emoji.emoji).then(() => {
                alert(`Copied "${emoji.emoji}" to clipboard!`);
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        });

        emoji_container.appendChild(emoji_div);
    });
}

// Event listener for page load
window.addEventListener('load', () => showEmojees(null));

// Event listener for search input
search_field.addEventListener('keyup', () => {
    let value = search_field.value.trim();
    showEmojees(value);
});
