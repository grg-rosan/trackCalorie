class CalorieTracker{
    constructor(){
        this._calorieLimit = 3000;
        this._totlaCalories = 0;
        this._meals = []
        this._workouts = []

        this._displayCaloriesTotal();
        this._displayCaloriesLimit();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
        this._displayCaloriesProgerss();
    }

    //public methods
    addMeal(meal){
        this._meals.push(meal);
        this._totlaCalories += meal.calories;
    }

    addWorkout(workout){
        this._workouts.push(workout);
        this._totlaCalories -= workout.calories;
    }

    //private methods
    _displayCaloriesTotal(){
        const totalCaloriesEl = document.getElementById('calories-total');
        totalCaloriesEl.innerHTML = this._totlaCalories;
    }

    _displayCaloriesLimit(){
            const calorieLimitEl = document.getElementById('calories-limit');
        calorieLimitEl.innerHTML = this._calorieLimit;
    }

    _displayCaloriesConsumed(){
        const caloriesCosumedEl = document.getElementById('calories-consumed');
        const consumed = this._meals.reduce((total, meal) => {
            total + meal.calories,0  // this funcion  loops through meal array and adds to total
        })
        caloriesCosumedEl.innerHTML = consumed;
    }

    _displayCaloriesBurned(){
        const caloriesBurnedEl = document.getElementById('calories-burned');
        const burned = this._workouts.reduce((total,workout) => {
            total + workout.calories,0  // this funcion  loops through meal array and adds to total
        })
        caloriesBurnedEl.innerHTML = burned;
    }

    _displayCaloriesRemaining(){
        const caloriesRemaningEl = document.getElementById('calories-remaining');
        const progressEl = document.getElementById('calorie-progress');

        const remaining = this._calorieLimit - this._totlaCalories

        caloriesRemaningEl.innerHTML = remaining

        if(remaining <= 0){
            caloriesRemaningEl.parentElement.parentElement.classList.remove('bg-light');
            caloriesRemaningEl.parentElement.parentElement.classList.add('bg-danger')
            
            progressEl.classList.remove('bg-success')
            progressEl.classList.add('bg-danger')

        }else{
            caloriesRemaningEl.parentElement.parentElement.classList.remove('bg-danger');
            caloriesRemaningEl.parentElement.parentElement.classList.add('bg-light')
            progressEl.classList.remove('bg-danger')
            progressEl.classList.add('bg-sucess')


        }
    }

    _displayCaloriesProgerss(){
        const progressEl = document.getElementById('calorie-progress');
        const percentage = (this._totlaCalories/this._calorieLimit) * 100;

        const width = Math.min(percentage,100)
        progressEl.style.width = `${width}%`

    }

    _render(){
        this._displayCaloriesTotal();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining()
        this._displayCaloriesProgerss();

    }
}

class Meal{
    constructor(name, calories){
        this.id = Math.random().toString(16).slice(2);
        this.name = name;
        this.calories = calories;
        this._render();
    }
}


class Workout{
    constructor(name, calories){
        this.id = Math.random().toString(16).slice(2);
        this.name = name;
        this.calories = calories;
        this._render();
    }
}

const tracker = new CalorieTracker()
