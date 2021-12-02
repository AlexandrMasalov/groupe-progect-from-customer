const $tableOrders = document.querySelector('.table-orders');
const $wrapper = document.querySelector('.wrapper');


function renderClient() {
  return `<h1>Privet</h1>`
}





function renderCard(order) {
  return `
  <div class="col-6 m-auto">
    <h3 class="text-center">Заказ №${order.number}</h3>
    <ul class="list-group list-group-flush">
      <li class="list-group-item list-group-item-action list-group-item-secondary mb-2">Тип мебели: <span class="p-3 fw-bolder"> ${order.Furniture.type}<span></li>
      <li class="list-group-item list-group-item-action list-group-item-secondary mb-2">Цена: <span class="p-3 fw-bolder">${order.Furniture.price}<span></li>
      <li class="list-group-item list-group-item-action list-group-item-secondary mb-2">Стоимость доствки: <span class="p-3 fw-bolder">${Math.floor(order.Furniture.price * 0.05)}<span></li>
      <li class="list-group-item list-group-item-action list-group-item-secondary mb-2">Стоимость сборки: <span class="p-3 fw-bolder">${Math.floor(order.Furniture.price * 0.07)}<span></li>
      <li class="list-group-item list-group-item-action list-group-item-secondary mb-2">Дата доставки: <span class="p-3 fw-bolder">${order.Delivery.data}<span></li>
      <li class="list-group-item list-group-item-action list-group-item-secondary mb-2">Дата сборки:<span class="p-3 fw-bolder"> ${order.Assembly.data}<span></li>
      <li class="list-group-item list-group-item-action list-group-item-secondary mb-2">Бригада доствки: <span class="p-3 fw-bolder">${order.Delivery.groupDelivery_id}<span></li>
      <li class="list-group-item list-group-item-action list-group-item-secondary mb-2">Бригада сборки:<span class="p-3 fw-bolder"> ${order.Assembly.groupAssembly_id}<span></li>
      <li class="list-group-item list-group-item-action list-group-item-secondary mb-2">Клиент: <span class="p-3 fw-bolder">${order.Client.name} ${order.Client.lastName}<span></li>
      <li class="list-group-item list-group-item-action list-group-item-secondary mb-2">Телефон клиента: <span class="p-3 fw-bolder"> ${order.Client.telephone}<span></li>
      <li class="list-group-item list-group-item-action list-group-item-secondary mb-2">Адресс доставки: <span class="p-3 fw-bolder">${order.Client.adress}<span></li>
      <li class="list-group-item list-group-item-action list-group-item-secondary mb-2">Статус: <span class="p-3 fw-bolder"> ${order.Status.type}<span></li>
      <li class="list-group-item list-group-item-action list-group-item-secondary mb-2">Комментарии: <span class="p-3 fw-bolder">${order.Comments[0].body}<span></li>
    </ul>
    <a class="btn btn-primary col-12" href="/orders" role="button">Назад</a>
  </div>
  `;
}

$tableOrders?.addEventListener('dblclick', async (e) => {
  if (e.target.nodeName === 'TD') {
    const tableRow = e.target.closest('[data-orderId]');
    const orderId = tableRow.dataset.orderid;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(`/orders/card/${orderId}`, options);
    const order = await response.json();

    console.log(order);
    console.log(order);
    if (response.status) {
      $wrapper.innerHTML = '';
      $wrapper.insertAdjacentHTML('afterbegin', renderCard(order.order));
    }
  }
});


// Карточка Клиента
const $tableClients = document.querySelector('.table-clients');
$tableClients?.addEventListener('dblclick', async (e) => {
  if (e.target.nodeName === 'TD') {
    // console.log(e.target);
    const tableRow = e.target.closest('[data-clientid]')
    const clientId = tableRow.dataset.clientid
    // console.log(clientId);
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    // console.log(clientId);
    const response = await fetch(`/clients/card/${clientId}`, options);
    const { orders, client } = await response.json();

    console.log(orders.length, '11111')
    console.log(client, '2222')

  
    

    if (response.status) {
      // $wrapper.insertAdjacentHTML('afterbegin', renderCard(client));
      console.log(123);
      $wrapper.innerHTML = '';
      orders.forEach(order => {
        $wrapper.insertAdjacentHTML('afterbegin', renderCard(order, client));
      });
    }


  }
});
