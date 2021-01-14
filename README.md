# Pokedex

Todos los datos relacionados con Pokémon fueron obtenidos del servicio de la [PokéApi](https://pokeapi.co/).

Construido con [Angular CLI](https://github.com/angular/angular-cli) v.11.0.5 y maquetado con SCSS GRID, con diseño responsivo bajo la filosofía Mobile First Design para una mejor navegación en dispositivos móviles.

Uso de Angular Material para los componentes de paginación, autocompletar (con destacador) y pantalla de carga. La lista y posición de página se almacenan en SessionStorage de forma temporal con el fin de minimizar las peticiones al servidor.

#### Manejo de JSON e información disponible de cada Pokémon:

Estadísticas base, tipos elementales, géneros de la especie, descripción, habilidades, generación a la que pertenecen, tasa de captura, información en caso de ser bebé, mítico o legendario, el árbol evolutivo de la especie (aplicando recursividad para la estructura tipo árbol del JSON) y manejo de errores en caso de existir algún problema con el servicio de la PokeApi.

## Demo:

Enlace del sitio --> [Pokédex](https://swtnicolas.github.io/pokedex/) <--
