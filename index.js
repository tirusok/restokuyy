const toggleMenu = document.getElementById('toggleMenu');
        const mobileMenu = document.getElementById('mobileMenu');

        toggleMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        async function fetchMenu() {
          try {
            const response = await fetch('http://localhost:3000/menu');
            const menu = await response.json();
    
            const menuList = document.getElementById('menu-list');
            menuList.innerHTML = ''; // Clear previous content
    
            menu.forEach(item => {
              const listItem = document.createElement('li');
              listItem.className = 'bg-white shadow-md rounded-lg p-4';
    
              listItem.innerHTML = `
                <h2 class="text-xl font-bold">${item.name}</h2>
                <p class="text-gray-700">${item.description}</p>
                <p class="text-green-600 font-semibold">${item.price} IDR</p>
              `;
    
              menuList.appendChild(listItem);
            });
          } catch (error) {
            console.error('Error fetching menu:', error);
          }
        }
    
        // Fetch menu on page load
        fetchMenu();