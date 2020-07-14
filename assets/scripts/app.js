const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;
const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'SATTACK'
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_SATTACK'
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';
const enteredValue = prompt("Maximum life for you abd the monster", "100");
let chosenMaxLife = parseInt(enteredValue);
let battleLog = [];

if (isNaN(enteredValue) || chosenMaxLife <= 0) {
    chosenMaxLife = 100; // As Default!
}

function writeToLog(event, value, monsterHealth, playerHealth) {
    let logEntry = {
        event: event,
        value: value,
        finalMonsterHealth = monsterHealth,
        finalPlayerHealth = playerHealth
    };
    if (event === LOG_EVENT_PLAYERR_ATTACK) {
        logEntry.target = 'MONSTER';

    } else if (event === LOG_EVENT_PLAYERR__STRONG_ATTACK) {
        logEntry.target = 'MONSTER';
    } else if (event === LOG_EVENT_MONSTER_ATTACK) {
        logEntry.target = 'PLAYER';

    } else if (event === LOG_EVENT_PLAYER_HEAL) {
        logEntry.target = 'PLAYER';
    } else if (event === LOG_EVENT_GAME_OVER) {
    }
    battleLog.push(logEntry);
}


let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function reset() {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
    addBonusLife();
}

function endRound() {
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        currentPlayerHealth = initialPlayerHealth;
        removeBonusLife();
        setPlayerHealth(initialPlayerHealth);
    }

    if (currentPlayerHealth > 0 && currentMonsterHealth <= 0) {
        window.setTimeout(window.alert, 2 * 100, "You won!");
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        window.setTimeout(window.alert, 2 * 100, "You Died");
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
        window.setTimeout(window.alert, 2 * 100, "A DRAW!");
    }

    if (currentPlayerHealth <= 0 || currentMonsterHealth <= 0) {
        reset();
    }
}

function attack(mode) {
    let maxDamage;
    if (mode === MODE_ATTACK) {
        maxDamage = ATTACK_VALUE;
    } else if (mode === MODE_STRONG_ATTACK) {
        maxDamage = STRONG_ATTACK_VALUE;
    }
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    endRound();
}

function attackHandler() {
    attack(MODE_ATTACK);
}

function strongAttackHandler() {
    attack(MODE_STRONG_ATTACK);
}

function healPlayerHandler() {
    let healvalue;
    if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
        alert("Can't heal more than your maximum health");
        healvalue = chosenMaxLife - currentPlayerHealth;
    } else {
        healvalue = HEAL_VALUE;
    }
    increasePlayerHealth(healvalue);
    currentPlayerHealth += healvalue;

    endRound();
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
