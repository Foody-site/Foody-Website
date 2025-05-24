import FoodCard from "../shared/cards/FoodCard"

const FoodRestaurant = () => {
    return (
        <div><FoodCard key={store.id} data={store} /></div>
    )
}

export default FoodRestaurant