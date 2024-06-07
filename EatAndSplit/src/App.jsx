import { useState } from 'react';
import './App.css'

const initialFriend = [
  {
    id: 12,
    name: "Raj",
    image: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
    balance: 20
  },
  {
    id: 13,
    name: "Shyam",
    image: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
    balance: 10
  },
  {
    id: 14,
    name: "Kumar",
    image: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
    balance: 4
  },
  {
    id: 15,
    name: "Rahul",
    image: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
    balance: -7
  },
  {
    id: 16,
    name: "Suraj",
    image: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
    balance: 0
  }
]

function Button({ children, onClick }) {
  return <button className='button' onClick={onClick}>{children}</button>
}



export default function App() {

  const [friends, setFriends] = useState(initialFriend);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectFriend, setSelectFriend] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  function handleAddFriend(newFriend) {

    setFriends((friends) => [...friends, newFriend]);
    console.log("friends = ", friends);

  }

  function handleSelection(friend) {
    // setSelectFriend(friend);

    setSelectFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    console.log("value = ", value);
    setFriends((friends) => friends.map((friend) =>
      friend.id === selectFriend.id ? { ...friend, balance: friend.balance + value } : friend
    ));
    setSelectFriend(null);
  }

  return (
    <div className='App'>
      <div className='sidebar'>
        <FriendList friends={friends} onSelection={handleSelection} selectFriend={selectFriend} />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <div className='addfriend'>
          <Button onClick={handleShowAddFriend}>{showAddFriend ? "Close" : "Add Friend"}</Button>
        </div>
      </div>
      {selectFriend && <div className='FormSplitBill'>
        <FormSplitBill selectFriend={selectFriend} onSplitBill={handleSplitBill} />
      </div>}
    </div>
  )
}

function FriendList({ friends, onSelection, selectFriend }) {

  return (

    <div>
      {friends.map((friend, id) =>
        <Friend friend={friend} key={id} onSelection={onSelection} selectFriend={selectFriend} />
      )}
    </div>

  )
}

function Friend({ friend, onSelection, selectFriend }) {

  const isSelect = selectFriend?.id === friend.id;
  console.log("isSelect = ", isSelect, selectFriend?.id, friend.id);

  return (
    <div className='friendlist'>

      <div className="gr">
        <div className='image'>
          <img className='friendImage' src={friend.image} alt={friend.Name} />
        </div>

        <div className='just'>
          <div className='friendname'>
            <h2 className='h2-heading'>{friend.name} </h2>
          </div>

          <div className='status'>
            {friend.balance < 0 && (
              <p className='red'>You owe {friend.Name} <b> {Math.abs(friend.balance)}</b></p>
            )}

            {friend.balance > 0 && (
              <p className='green'>{friend.Name} owns you <b>{Math.abs(friend.balance)}</b></p>
            )}

            {friend.balance === 0 && (
              <p className='red'>You and your {friend.Name} are even.</p>
            )}
          </div>
        </div>
      </div>

      <div className='selectbtn'>
        <Button onClick={() => onSelection(friend)}>
          {isSelect ? "Close" : "Select"}
        </Button>
      </div>

    </div>
  );
}



function FormAddFriend({ onAddFriend }) {

  const [name, setName] = useState("");
  const [image, setImage] = useState("https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) {
      return;
    }

    const id = crypto.randomUUID();

    const newFriend = {
      id,
      name,
      image,
      balance: 0
    }

    console.log();
    onAddFriend(newFriend);
    console.log("newFriend = ", newFriend);

    setName("");
    setImage("");
  }

  return (
    <form action="" onSubmit={handleSubmit} className='addFriend'>
      <div>
        <label htmlFor="friendName">Friend Name</label>
        <input type="text" name="" id="friendName" value={name} onChange={(e) => setName(e.target.value)} /><br />

        <label htmlFor="Image">Image urls</label>
        <input type="text" name="" id='Image' value={image} onChange={(e) => {

          setImage(e.target.value)
          console.log(image);

        }
        } /><br />

        <Button>Add</Button>
      </div>
    </form>
  );
}

function FormSplitBill({ selectFriend, onSplitBill }) {

  const [bill, setBill] = useState('');
  const [paidByUser, setPaidByUser] = useState('');
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !paidByUser) {
      return;
    }

    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }

  return (
    <form className='form-split-bill' onSubmit={handleSubmit}>
      <div>
        <h2>Split a bill with {selectFriend.name}</h2>

        <label htmlFor="Bill">💰 Bill Value</label>
        <input type="Number" name="" id='Bill' value={bill} onChange={(e) => Number(setBill(e.target.value))} /><br />

        <label htmlFor="expense">🤵Your Expense</label>
        <input type="Number" name="expense" id="expense" value={paidByUser}
          onChange={(e) =>
            setPaidByUser(Number(e.target.value) > bill ? paidByUser : Number(e.target.value))} /><br />

        <label htmlFor="friendexpense" >👬{selectFriend.name}'s expense</label>
        <input type="text" name="" id='friendexpense' value={paidByFriend} disabled /><br />

        <label htmlFor="Paying">Who is paying the bill</label>
        <select name="" id="Paying" value={whoIsPaying} onChange={(e) => setWhoIsPaying(e.target.value)}>
          <option value="user">You</option>
          <option value="friend">{selectFriend.name}</option>
        </select>
        <br />

        <Button>Split Bill</Button>
      </div>
    </form>
  );
}