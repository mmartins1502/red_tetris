# Tetris MultiPlayer Online

Premier projet React.js / TypeScript / Node.js

Possibilité de jouer seul.

En mode multi:
  - pour n lignes detruites, les adversaires reçoivent n-1 lignes indestructibles en bas de leur grille.
  - les spectres des adversaires sont visibles 
  - 4 joueurs maximum par Room
  - les joueurs reçoivent les mêmes tetriminos dans le même ordre.
  
Possibilité pour le owner de la room de changer la difficulté, ou d'ajouter des options de jeu.
  
Tetriminos générés à la volé, via le véritable algorithme [Tetris: The Grand Master 3 - Terror-Instinct (2005)](https://simon.lc/the-history-of-tetris-randomizers)

Affichage des 3 prochains Tetriminos.

Contraintes : 
  - utilisation d'une hash based url
  - requêtes entre front et back via socket.io
  - test coverage 70% minimum

## Home Page
<img src="./images/Capture d’écran 2020-06-18 à 15.48.57.png" />

## Room Page
<img src="./images/Capture d’écran 2020-06-18 à 15.49.49.png" />

## Settings Modal
<img src="./images/Capture d’écran 2020-06-18 à 15.50.01.png" />

## Game Page
<img src="./images/Capture d’écran 2020-06-18 à 15.51.50.png" />

