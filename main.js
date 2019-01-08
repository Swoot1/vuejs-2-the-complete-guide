new Vue({
    el: '#app',
    data: {
        playerHealth: null,            
        monsterHealth: null,
        actions: [],
        message: null,
        gameIsPlaying: false,
    },
    methods: {
        startNewGame(){
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.message = null;
            this.actions.length = [];
            this.gameIsPlaying = true;
        },
        monsterAttack(){
            const damage = this.getMinorDamage();
            this.playerHealth -= damage;
            this.actions.unshift({
                performedBy: 'MONSTER',
                subject: 'PLAYER',
                type: 'ATTACKS',
                damage
            });
        },
        playerAttack(){
            const damage = this.getMinorDamage();
            this.monsterHealth -= damage;
            this.actions.unshift({
                performedBy: 'PLAYER',
                subject: 'MONSTER',
                type: 'ATTACKS',
                damage
            });

            if(this.gameIsPlaying) {
                this.monsterAttack();
            }
        },
        playerSpecialAttack(){
            const damage = this.getSevereDamage();
            this.monsterHealth -= damage;
            this.actions.unshift({
                performedBy: 'PLAYER',
                subject: 'MONSTER',
                type: 'ATTACKS',
                damage
            });

            if(this.gameIsPlaying) {
                this.monsterAttack();
            } 
        },
        healPlayer(){
            const healingPower = 10;
            this.playerHealth += healingPower;
            this.actions.unshift({
                performedBy: 'PLAYER',
                subject: 'HER-/HIMSELF',
                type: 'HEALS',
                damage: healingPower
            });

            this.monsterAttack();
        },
        giveUp(){
            this.message = 'Game is over coward!'
            this.actions = [];
            this.gameIsPlaying = false;
        },
        getMinorDamage(){
            const max = 12;
            const min = 5;
            return this.getRandomDamage(max, min);
        },
        getSevereDamage(){
            const max = 20;
            const min = 5;
            return this.getRandomDamage(max, min);
        },
        getRandomDamage(max, min){
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    },
    computed: {
        gameOver(){
            if(this.playerHealth <= 0 || this.monsterHealth <= 0){
                return true;
            }
        }
    },
    watch: {
        monsterHealth: function(){
            if(this.monsterHealth <= 0) {
                this.gameIsPlaying = false;
                this.message = 'Player wins!'
                return;
            }
        },
        playerHealth: function() {
            if(this.playerHealth <= 0) {
                this.gameIsPlaying = false;
                this.message = 'Monster wins!'
                return;
            }
        }
    }
});