let balance = 1000;
let stock = 50; // Initial stock in the warehouse
let timeLeft = 10;
let timerInterval;
let balanceChart; // Variable to store the chart instance
let demand = 0
const updateDemand = () => {
  document.getElementById("demand").textContent = Math.floor(Math.random() * 100) + 1;
  demand = parseInt(document.getElementById("demand").textContent);
  updateChart(); // Update the chart when demand changes
};

const updateStock = () => {
  const stockElement = document.getElementById("stock");
  stockElement.textContent = stock; // Display remaining stock
};

const updateButtons = () => {
  const orderChinaButton = document.getElementById("order-china");
  const orderMexicoButton = document.getElementById("order-mexico");
  const chinaQuantityInput = document.getElementById("china-quantity");
  const mexicoQuantityInput = document.getElementById("mexico-quantity");

  orderChinaButton.disabled = stock <= document.getElementById("demand").textContent;
  orderMexicoButton.disabled = stock <= document.getElementById("demand").textContent;
  chinaQuantityInput.disabled = false;
  mexicoQuantityInput.disabled = false;
};

const updateCountdown = () => {
  const countdownElement = document.getElementById("countdown");
  countdownElement.textContent = `Time left: ${timeLeft} seconds`;
};

const updateMessage = (msg) => {
  const messageElement = document.getElementById("message");
  messageElement.textContent = msg;
};


const restartTimer = () => {
  clearInterval(timerInterval);
  timeLeft = 10;
  timerInterval = setInterval(() => {
    timeLeft--;
    updateCountdown();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      const currentDemand = parseInt(document.getElementById("demand").textContent);
      if (stock >= currentDemand) {
        stock -= currentDemand;
        updateStock(); // Update stock display
      } else if(demand>stock) {
        alert("out of stock!!")
      }
      updateDemand(); // Update demand after deducting stock
      restartTimer();
    }
  }, 1000);
};

const orderChinaButton = document.getElementById("order-china");
orderChinaButton.addEventListener("click", (e) => {
  let quantity = document.getElementById("china-quantity").valueAsNumber; // Get the value from the input element
  if (!isNaN(quantity)) { // Check if quantity is a valid number
    balance -= 5 * quantity;
   stock += quantity;
    setInterval(()=>{
      updateStock();
      updateButtons();
      updateChart();
    },40000)
    console.log(balance);
  }
});

const orderMexicoButton = document.getElementById("order-mexico");
orderMexicoButton.addEventListener("click", (e) => {
  let quantity = document.getElementById("mexico-quantity").valueAsNumber; // Get the value from the input element
  if (!isNaN(quantity)) { // Check if quantity is a valid number
    balance -= 8 * quantity;
    stock += quantity;
    setInterval(()=>{
      updateStock();
      updateButtons();
      updateChart();
    },10000)
    console.log(balance);
  }
});



const chinaQuantityInput = document.getElementById("china-quantity");
chinaQuantityInput.addEventListener("change", (event) => {
  event.target.min = 1;
});

const mexicoQuantityInput = document.getElementById("mexico-quantity");
mexicoQuantityInput.addEventListener("change", (event) => {
  event.target.min = 1;
});

const ctx = document.getElementById("balance-chart").getContext("2d");
balanceChart = new Chart(ctx, {
  type: "line", // Use line chart
  data: {
    labels: [],
    datasets: [
      {
        label: "Bank Balance",
        data: [],
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2
      },
    ],
  },
  options: {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: 'Time (seconds)'
        }
      },
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Bank Balance ($)'
        }
      },
    },
  },
});

const updateChart = () => {
  const timePassed = 10 - timeLeft; // Calculate time passed
  balanceChart.data.labels.push(timePassed); // Add time to labels
  balanceChart.data.datasets[0].data.push(balance); // Add balance to dataset
  balanceChart.update(); // Update the chart
};





updateChart(); // Initial chart update
updateStock(); // Initial stock update
updateButtons(); // Ensure buttons are correctly initialized
restartTimer(); 
  