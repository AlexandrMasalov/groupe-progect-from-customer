const $tableOrders = document.querySelector('.table-orders');
const $wrapper = document.querySelector('.wrapper');

function renderComment(comment) {
  return `
      <figure class="mt-2">
        <figcaption class="blockquote-footer mb-0">
          <cite title="Source Title">${comment.author}</cite>
        </figcaption>
        <blockquote class="blockquote">
          <p>${comment.body}</p>
        </blockquote>
      </figure> 
    `;
}

function renderCardOrder(order) {
  return `
    <div data-orderid=${order.id} class="col-6 m-auto">
      <h3 class="text-center">Заказ №${order.number}</h3>
      <ul data-clientid=${order.Client.id} class="list-group list-group-flush">
        <li class="list-group-item list-group-item-action list-group-item-secondary mb-2">Тип мебели: <span class="p-3 fw-bolder"> ${order.Furniture.type}<span></li>
        <li class="list-group-item list-group-item-action list-group-item-secondary mb-2">Цена: <span class="p-3 fw-bolder">${order.Furniture.price}<span></li>
        <li class="list-group-item list-group-item-action list-group-item-secondary mb-2">Стоимость доствки: <span class="p-3 fw-bolder">${Math.floor(order.Furniture.price * 0.05)}<span></li>
        <li class="list-group-item list-group-item-action list-group-item-secondary mb-2">Стоимость сборки: <span class="p-3 fw-bolder">${Math.floor(order.Furniture.price * 0.07)}<span></li>
        <li class="list-group-item list-group-item-action list-group-item-secondary mb-2">Дата доставки: <span class="p-3 fw-bolder">${order.Delivery.date}<span></li>
        <li class="list-group-item list-group-item-action list-group-item-secondary mb-2">Дата сборки:<span class="p-3 fw-bolder"> ${order.Assembly.date}<span></li>
        <li class="list-group-item list-group-item-action list-group-item-secondary mb-2">Бригада доствки: <span class="p-3 fw-bolder">${order.Delivery.groupDelivery_id}<span></li>
        <li class="list-group-item list-group-item-action list-group-item-secondary mb-2">Бригада сборки:<span class="p-3 fw-bolder"> ${order.Assembly.groupAssembly_id}<span></li>
        <li class="list-group-item list-group-item-action list-group-item-secondary mb-2">Клиент: <span class="p-3 fw-bolder">${order.Client.name} ${order.Client.lastName}<span></li>
        <li class="list-group-item list-group-item-action list-group-item-secondary mb-2">Телефон клиента: <span class="p-3 fw-bolder"> ${order.Client.telephone}<span></li>
        <li class="list-group-item list-group-item-action list-group-item-secondary mb-2">Адресс доставки: <span class="p-3 fw-bolder">${order.Client.adress}<span></li>
        <li class="list-group-item list-group-item-action list-group-item-secondary mb-2">Статус: <span class="p-3 fw-bolder"> ${order.Status.type}<span></li>
        <li class="list-group-item list-group-item-action list-group-item-secondary mb-2 comment">
        <div class="d-flex justify-content-between">
          <p>Комментарии:</p>
          <button data-add="comment" type="button" class="btn btn-primary">+</button>
        </div>
        <div class="comment-block">
          ${order.Comments.map(renderComment).join('')}
        </div>
        </li>
      </ul>
    </div>
  `;
}

function renderCardClient(client) {
  return `
  <div class="col-6 m-auto">
    <h3 class="text-center">Клиент ${client.name} ${client.lastName}</h3>
    <ul class="list-group list-group-flush">
      <li class="list-group-item list-group-item-action list-group-item-secondary mb-2">Телефон клиента: <span class="p-3 fw-bolder"> ${client.telephone}<span></li>
      <li class="list-group-item list-group-item-action list-group-item-secondary mb-2">Адресс доставки: <span class="p-3 fw-bolder">${client.adress}<span></li>
    </ul>   
  </div>
  `;
}

function button() {
  return `
  <br>
  <div class="col-6 m-auto">
    <a class="btn btn-primary col-12" href="/clients" role="button">Назад</a>
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

    if (response.status) {
      $wrapper.innerHTML = '';
      $wrapper.insertAdjacentHTML('afterbegin', renderCardOrder(order.order));
    }
  }
});

// Карточка Клиента
const $tableClients = document.querySelector('.table-clients');
$tableClients?.addEventListener('dblclick', async (e) => {
  if (e.target.nodeName === 'TD') {
    // console.log(e.target);
    const tableRow = e.target.closest('[data-clientid]');
    const clientId = tableRow.dataset.clientid;
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

    if (response.status) {
      $wrapper.innerHTML = '';
      $wrapper.insertAdjacentHTML('afterbegin', renderCardClient(client));
      orders.forEach((order) => {
        // const newDate = dayjs(order.Delivery.dataValues.date).format('YY-MM-DD HH:mm');
        $wrapper.insertAdjacentHTML('beforeend', renderCardOrder(order));
      });
      $wrapper.insertAdjacentHTML('beforeend', button());
    }
  }
});

$wrapper?.addEventListener('click', async (e) => {
  if (e.target.dataset.add === 'comment') {
    const $liCommet = document.querySelector('.comment');
    const textarea = `
      <div class="form-floating mb-3 texteria-block">
        <textarea name="comment" class="form-control" placeholder="Leave a comment here" id="comment"></textarea>
        <label for="comment">Комментарии клиента</label>
        <button data-add="newComment" type="button" class="btn btn-primary mb-3">Добавить</button>
      </div>
    `;

    $liCommet.insertAdjacentHTML('beforebegin', textarea);
  }

  if (e.target.dataset.add === 'newComment') {
    const $textarea = document.querySelector('textarea');
    const $commentBlock = document.querySelector('.comment-block');
    const $texteriaBlock = document.querySelector('.texteria-block');
    const order = e.target.closest('[data-orderid]');
    const orderId = order.dataset.orderid;
    const client = e.target.closest('ul');
    const clientId = client.dataset.clientid;

    const newComment = {
      body: $textarea.value,
      orderId,
      clientId,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newComment),
    };

    const response = await fetch('/comments', options);
    const comment = await response.json();

    if (comment) {
      $texteriaBlock.remove();
      $commentBlock.insertAdjacentHTML('afterbegin', renderComment(comment));
    }
  }
});
