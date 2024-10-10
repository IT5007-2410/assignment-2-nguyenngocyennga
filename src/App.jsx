/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const initialTravellers = JSON.parse(localStorage.getItem('travellers')) || [
  {
    id: 1,
    name: 'Nga Nguyen',
    phone: 8593789,
    email: 'nga@gmail.com',
    bookingTime: new Date().toLocaleString(),
  },
  {
    id: 2,
    name: 'Wen Shu',
    phone: 7755382,
    email: 'wn928@gmail.com',
    bookingTime: new Date().toLocaleString(),
  },
];

let serialNumber = initialTravellers.length > 0 ? initialTravellers[initialTravellers.length - 1].id + 1 : 1;

function TravellerRow(props) {
  {/*Q3. Placeholder to initialize local variable based on traveller prop.*/}
  const { traveller, onDelete } = props;

  return (
    <tr>
      {/*Q3. Placeholder for rendering one row of a table with required traveller attribute values.*/}
      <td>{traveller.id}</td>
      <td>{traveller.name}</td>
      <td>{traveller.phone}</td>
      <td>{traveller.email}</td>
      <td>{traveller.bookingTime}</td>

      {onDelete && (
        <td>
          <button onClick={() => onDelete(traveller.id)}>Delete</button>
        </td>
      )}

    </tr>
  );
}

function Display(props) {
  const { travellers } = props;
  /*Q3. Write code to render rows of table, each corresponding to one traveller. Make use of the TravellerRow function that draws one row.*/
  return (
    <div>
      <table className="bordered-table">
        <thead>
          <tr>
            {/*Q3. Below table is just an example. Add more columns based on the traveller attributes you choose.*/}
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Booking Time</th>
          </tr>
        </thead>
        <tbody>
          {/*Q3. Write code to call the JS variable defined at the top of this function to render table rows.*/}
          {travellers.map((traveller) => (
            <TravellerRow key={traveller.id} traveller={traveller} />
          ))}
        </tbody>
      </table>
      <p style={{ fontStyle: 'italic', fontSize: 'small' }}>
        The system allows duplicate names as one person can reserve tickets for multiple people. 🚧 
        System is under construction, more improvements are coming soon! 😍
      </p>
    </div>
  );
}

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', phone: '', email: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    /*Q4. Fetch the passenger details from the add form and call bookTraveller()*/
    const { name, phone, email } = this.state;

    if (!name || !phone || !email) {
      alert("Please fill in all fields.");
      return;
    }

    if (!/^\d+$/.test(phone)) {
      alert("Phone number should contain only digits.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const newTraveller = {
      id: serialNumber++,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      bookingTime: new Date().toLocaleString(),
    };

    this.props.bookTraveller(newTraveller);
    this.setState({ name: '', phone: '', email: '' });
  }

  render() {
    const remainingSeats = this.props.totalSeats - this.props.travellers.length;

    return (
      <div>
        <form name="addTraveller" onSubmit={this.handleSubmit}>
          {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}
          <input
            type="text"
            name="travellername"
            placeholder="Name"
            value={this.state.name}
            onChange={(e) => this.setState({ name: e.target.value })}
          />
          <input
            type="text"
            name="travellerphone"
            placeholder="Phone"
            value={this.state.phone}
            onChange={(e) => this.setState({ phone: e.target.value })}
          />
          <input
            type="email"
            name="travelleremail"
            placeholder="Email"
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
          />
          <button type="submit">Add</button>
        </form>
        <p>Remaining Seats: {remainingSeats}</p> {/* Display remaining seats */}
        <p style={{ fontStyle: 'italic', fontSize: 'small' }}>
          The system allows duplicate names as one person can reserve tickets for multiple people. 🚧 
          System is under construction, more improvements are coming soon! 😍
        </p>
      </div>
    );
  }
}


class Delete extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    /*Q5. Fetch the passenger details from the deletion form and call deleteTraveller()*/
    const { name } = this.state;

    if (!name) {
      alert("Please enter the name of the traveller.");
      return;
    }

    if (this.props.travellers.length === 0) {
      alert("There are no travellers to delete.");
      return;
    }

    const travellersWithName = this.props.travellers.filter(
      (traveller) => traveller.name.toLowerCase() === name.toLowerCase()
    );

    if (travellersWithName.length === 0) {
      alert("No traveller found with this name.");
      return;
    }

    if (travellersWithName.length > 1) {
      alert(
        `Multiple travellers found with the name "${name}". Please use the Delete button for individual records.`
      );
      return;
    }

    if (this.props.travellers.length === 1) {
      alert("You are deleting the last traveller in the system.");
    }

    this.props.deleteTraveller(travellersWithName[0].id);
    this.setState({ name: '' });
  }

  render() {
    return (
      <div>
        <form name="deleteTraveller" onSubmit={this.handleSubmit}>
          {/*Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example.*/}
          <input
            type="text"
            name="travellername"
            placeholder="Name"
            value={this.state.name}
            onChange={(e) => this.setState({ name: e.target.value })}
          />
          <button type="submit">Delete</button>
        </form>
        {/* Q5. Display travellers with delete button */}
        <table className="bordered-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Booking Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.props.travellers.map((traveller) => (
              <TravellerRow
                key={traveller.id}
                traveller={traveller}
                onDelete={this.props.deleteTraveller}
              />
            ))}
          </tbody>
        </table>
        <p style={{ fontStyle: 'italic', fontSize: 'small' }}>
          The system allows duplicate names as one person can reserve tickets for multiple people. 🚧 
          System is under construction, more improvements are coming soon!
        </p>
      </div>
    );
  }
}

class Homepage extends React.Component {
  render() {
    const { totalSeats, travellers } = this.props;
    const freeSeats = totalSeats - travellers.length;

    return (
      <div>
        {/*Q2. Placeholder for Homepage code that shows free seats visually. */}
        {/*Q6. Add visual representation of reserved and unreserved tickets.*/}
        <h2>Free Seats: {freeSeats} / {totalSeats}</h2> 
        <div style={{ display: 'flex', flexWrap: 'wrap', width: '110px' }}> {/* Adjusted the width to fit 2 seats */}
          {Array.from({ length: totalSeats }).map((_, index) => (
            <div
              key={index}
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: index < travellers.length ? 'grey' : 'green',
                margin: '5px',
              }}
            ></div>
          ))}
        </div>
      </div>
    );
  }
}

class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = { 
      travellers: initialTravellers, 
      selector: 'home', 
      totalSeats: 10,
    };
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
    this.setSelector = this.setSelector.bind(this);
  }

  componentDidUpdate() {
    localStorage.setItem('travellers', JSON.stringify(this.state.travellers));
  }

  setSelector(value) { 
  	/*Q2. Function to set the value of component selector variable based on user's button click. */
    this.setState({ selector: value }); 
  } 

  bookTraveller(traveller) {
    /*Q4. Write code to add a passenger to the traveller state variable.*/
    if (this.state.travellers.length < this.state.totalSeats) {
      this.setState((prevState) => ({
        travellers: [...prevState.travellers, traveller],
      }));
    } else {
      alert('No more seats available!');
    }
  }

  deleteTraveller(id) {
    /*Q5. Write code to delete a passenger from the traveller state variable.*/
    this.setState((prevState) => ({
      travellers: prevState.travellers.filter((traveller) => traveller.id !== id),
    }));
  }

  render() {
    return (
      <div>
        <h1>Ticket To Ride 🎫</h1> 
        <nav> 
          {/*Q2. Code for Navigation bar. Use basic buttons to create a nav bar. Use states to manage selection. */}
          <button onClick={() => this.setSelector('home')}>Home</button> 
          <button onClick={() => this.setSelector('add')}>Add Traveller</button> 
          <button onClick={() => this.setSelector('display')}>Display Travellers</button> 
          <button onClick={() => this.setSelector('delete')}>Delete Traveller</button> 
        </nav> 
	<div>
		{/*Only one of the below four divisions is rendered based on the button clicked by the user.*/}
		{/*Q2 and Q6. Code to call Instance that draws Homepage. Homepage shows Visual Representation of free seats. */}
    {this.state.selector === 'home' && ( 
      <Homepage totalSeats={this.state.totalSeats} travellers={this.state.travellers} /> 
    )} 
    {/*Q3. Code to call component that Displays Travellers.*/}
    {this.state.selector === 'display' && (
      <Display travellers={this.state.travellers} onDelete={this.deleteTraveller} />
    )}
		{/*Q4. Code to call the component that adds a traveller.*/}
    {this.state.selector === 'add' && (
      <Add travellers={this.state.travellers} bookTraveller={this.bookTraveller} totalSeats={this.state.totalSeats} />
    )}
		{/*Q5. Code to call the component that deletes a traveller based on a given attribute.*/}
    {this.state.selector === 'delete' && (
      <Delete travellers={this.state.travellers} deleteTraveller={this.deleteTraveller} />
    )}
	</div>
      </div>
    );
  }
}

const element = <TicketToRide />;

ReactDOM.render(element, document.getElementById('contents'));
