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
        this._displayNewMeal(meal);
        this._render();
    }

    addWorkout(workout){
        this._workouts.push(workout);
        this._totlaCalories -= workout.calories;
        this._dispalyNewWorkout(workout)
        this._render();

    }

    removeMeal(id){
        const index= this._meals.findIndex((meal)=>{meal.id ===id});
        if(index !== -1){
            const meal = this._meals[index];
            this._totlaCalories -= meal.calories;
            this._meals.splice(index,1);
            this._render();
        }
    }

    removeWorkout(id){
        const index= this._workouts.findIndex((workout)=>{workout.id ===id});
        if(index !== -1){
            const workout = this._workouts[index];
            this._totlaCalories -= workout.calories;
            this._workouts.splice(index,1);
            this._render();
        }
    }

    reset(){
        this._totlaCalories = 0;
        this._meals = []
        this._workouts = []
        this._render();
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
        const consumed = this._meals.reduce((total, meal) =>
            total + meal.calories,0  // this funcion  loops through meal array and adds to total
        )
        caloriesCosumedEl.innerHTML = consumed;
    }

    _displayCaloriesBurned(){
        const caloriesBurnedEl = document.getElementById('calories-burned');
        const burned = this._workouts.reduce((total,workout) => 
            total + workout.calories,0  // this funcion  loops through meal array and adds to total
        )
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

    _displayNewMeal(meal){
        const mealsEl = document.getElementById('meal-items');
        const mealEl = document.createElement('div')
        mealEl.classList.add('card', 'my-2');
        mealEl.setAttribute('data-id',meal.id);
        mealEl.innerHTML = `
              <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${meal.name}</h4>
                  <div
                    class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                    ${meal.calories}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>
        `;

        mealsEl.appendChild(mealEl);
    }

    _dispalyNewWorkout(workout){
        const workoutsEl = document.getElementById('workout-items');
        const workoutEl = document.createElement('div')
        workoutEl.classList.add('card', 'my-2');
        workoutEl.setAttribute('data-id',workout.id);
        workoutEl.innerHTML = `
              <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${workout.name}</h4>
                  <div
                    class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                    ${workout.calories}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>
        `;

        workoutsEl.appendChild(workoutEl);
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
    }
}


class Workout{
    constructor(name, calories){
        this.id = Math.random().toString(16).slice(2);
        this.name = name;
        this.calories = calories;
    }
}


class App{
    constructor(){
        this._tracker = new CalorieTracker();

        document.getElementById('meal-form')
        .addEventListener('submit',this._newItem.bind(this, 'meal')) // if we do not bind this keyword becomes 
        //windows element or event listiner elem
    
        document.getElementById('workout-form')
        .addEventListener('submit',this._newItem.bind(this, 'workout')) // if we do not bind this keyword becomes 
        

        document.getElementById('meal-items')
        .addEventListener('click',this._removeItems.bind(this,'meal'))//we bind because we target parent elem
    


        document.getElementById('workout-items')
        .addEventListener('click',this._removeItems.bind(this,'workout'))//we bind because we target parent elem
    
        document.getElementById('filter-meals')
        .addEventListener('keyup', this._filterItems.bind(this,'meals'))
    

        document.getElementById('filter-workouts')
        .addEventListener('keyup', this._filterItems.bind(this,'workout'))
    
        document.getElementById('reset')
        .addEventListener('click', this._reset.bind(this, 'meal'))
    }

    _newItem(type,e){
        e.preventDefault();

        const name = document.getElementById(`${type}-name`)
        const calories = document.getElementById(`${type}-calories`);

        //validate inputs
        if(name.value ==='' || calories.value === ''){
            alert('please fill in all fields')
            return;
        }

        if(type === 'meal'){
            const meal = new Meal(name.value, +calories.value);
            this._tracker.addMeal(meal);
        }else{
            const workout = new Workout(name.value, +calories.value);
            this._tracker.addWorkout(workout);
        }

        name.vlaue = '';
        calories.vlaue = '';

        const collapse = document.getElementById(`collapse-${type}`)
        const bsCollapse = new bootstrap.Collapse(collapse,{
            toggle: true
        })
    }


    _removeItems(type,e){
        if(
            e.target.classList.contains('delete') || 
            e.target.classList.contains('fa-xmark')){
                if(confirm('Are you sure?')){
                    const id = e.target.closest('.card').getAttribute('data-id');

                    type === 'meal' 
                     ? this._tracker.removeMeal(id) 
                     : this._tracker.removeWorkout(id)

                    e.target.closest('.card').remove()
                }
            }   
    }

    _filterItems(type, e){
        const txet = e.target.value.toLowerCase();
        document.querySelectorAll(`#${type}-items .card`).forEach((item) => {
            const name = item.firstElementChild.firstElementChild.textContent;

            if(name.toLowerCase().indexOf(text) != -1){
                item.style.display = 'block'
            }else{
                item.style.dispaly = 'none'
            }
        })
    }

    _reset(){
        this._tracker.reset();
        document.getElementById('meal-items').innerHTML = '';
        document.getElementById('workout-items').innerHTML = '';
        document.getElementById('filter-meals').innerHTML = '';
        document.getElementById('filter-workouts').innerHTML = '';
     
    }
}

const app = new App();