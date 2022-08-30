import "./App.css";
import contactList from './contacts.json';
import { useState } from "react";
const firstFiveContact = contactList.slice(0,5);

function App() {
  
  const [contacts, setContact] = useState(firstFiveContact);

  // generate random contact and append in first five contacts
  const GenerateRandomContact = () => {
    let randomContactIndex = (Math.floor(Math.random() * (contactList.length - firstFiveContact.length)) + 5);
    const newRandomCeleb = contactList[randomContactIndex];
    // let newArr = [];
    // console.log(randomContact)
    // console.log("Before: " , firstFiveContact);
    // // newArr = firstFiveContact.unshift(contactList[randomContact])
    // console.log("After: " , firstFiveContact);
    const index = contacts.findIndex(object => object.id === newRandomCeleb.id);

    if (index === -1) {
      setContact(firstFiveContact => [...firstFiveContact, newRandomCeleb])
    }
  }

  // sort contacts by names 
  const SortContactNames = () => {
    const sortedNames = [...contacts].sort((a, b) =>
      a.name > b.name ? 1 : -1,
  );
    setContact(sortedNames);
  }

  // sort contact by popularity
  const SortContactPopularity = () => {
    const sortedPopularity = [...contacts].sort((a, b) => b.popularity - a.popularity);
    setContact(sortedPopularity);
  }

  // delete particular contact by id
  const deleteContact = (id) => {
      const filteredContacts = contacts.filter((contact) => {
        return contact.id !== id;
      });
      setContact(filteredContacts)
  }

  return <div className="App">
    <h1>Iron Contacts</h1>
    <button onClick={GenerateRandomContact}>Add Random Contact</button>
    <button onClick={SortContactNames}> Sort By Name</button>
    <button onClick={SortContactPopularity}> Sort By Popularity</button>
    
    <table>
      <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won Oscar</th>
          <th>Won Emmy</th>
          <th>Action</th>
        </tr>
        
      </thead>
      <tbody>
        {contacts.map((contact) => {
          return (<tr key = {contact.id}>
            <td><img src = {contact.pictureUrl} alt="contact"/></td>
            <td>{contact.name}</td>
            <td>{contact.popularity}</td>
            <td>{contact.wonOscar ? "🏆" : ""}</td>
            <td>{contact.wonEmmy ? "🏆" : ""}</td>
            <td>
              <button onClick={() => deleteContact(contact.id)}>
                Delete</button>
            </td>
          </tr>)
        })}
        
      </tbody>
    </table>
  </div>;
}
export default App;