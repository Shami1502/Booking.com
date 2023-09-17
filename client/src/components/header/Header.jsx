import './header.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faPlane, faCar, faTaxi, faCalendarDay, faPerson} from '@fortawesome/free-solid-svg-icons';
import { DateRange} from 'react-date-range';
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format} from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import {AuthContext} from "../../context/AuthContext.js"; 
import { SearchContext } from '../../context/searchContext';

const Header = ({type}) => {
    const [destination, setDestination] = useState("");
    const [openDate , setOpenDate] = useState(false);
    const [dates, setDates] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: "selection",
        },
      ]);
      const navigate= useNavigate();
      const {user } = useContext(AuthContext);
      const [openOptions, setOpenOptions] = useState(false);
      const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
      });

      const handleOption = (name, operation) => {
        setOptions((prev) => {
          return {
            ...prev,
            [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
          };
        });
      };
     const { dispatch  } = useContext(SearchContext);
      const handleSubmit = () =>{
         dispatch({type:"NEW_SEARCH", payload:{  destination,dates,options}})
         navigate("/hotels" , {state: {destination, dates , options}})
      }
  return (
    <div className='header'>
        <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
        <div className='headerList'>
            <div className='headerListItem  active'>
              <FontAwesomeIcon icon={faBed} />
              <span>Stays</span>   
            </div>
            <div className='headerListItem'>
              <FontAwesomeIcon icon={faPlane} />
              <span>Flights</span>   
            </div>
            <div className='headerListItem'>
              <FontAwesomeIcon icon={faCar} />
              <span>Car Rentals</span>   
            </div>
            <div className='headerListItem'>
              <FontAwesomeIcon icon={faBed} />
              <span>Attractions</span>   
            </div>
            <div className='headerListItem'>
              <FontAwesomeIcon icon={faTaxi} />
              <span>Airport Taxi</span>   
            </div>
        </div>
        {
            type !== "list" &&
            <>
              <h1 className='headerTitle'>A LifeTime of discounts? It's Genius</h1>
            <p className='headerDesc'>
              Get rewarded for your travels – unlock instant savings of 10% or
              more with a free Lamabooking account
            </p>
            { !user && <button className="headerBtn">Sign in / Register</button>}
            <div className='headerSearch'>
                <div className='headerSearchItem'>
                    <FontAwesomeIcon icon={faBed} className="headerIcon" />
                    <input type='text' placeholder='Where are you going?' onChange={e => setDestination(e.target.value)} className='headerSearchInput' />
                </div>
                <div className='headerSearchItem'>
                    <FontAwesomeIcon icon={faCalendarDay} className="headerIcon" />
                    <span className='headerSearchText' onClick={()=>setOpenDate(!openDate)}>{`${format(dates[0].startDate, 'MM/dd/yyyy')} to ${format(dates[0].endDate, 'MM/dd/yyyy')}`}</span>
                   {openDate &&  <DateRange
                       editableDateInputs={true}
                       onChange={(item) => setDates([item.selection])}
                       moveRangeOnFirstSelection={false}
                       ranges={dates}
                       className="date"
                       minDate={new Date()}
                    />}
                </div>
                <div className='headerSearchItem'>
                    <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                    <span className='headerSearchText' onClick={()=> setOpenOptions(!openOptions)}>{`${options.adult} adult . ${options.children} childern . ${options.room} room`}</span>
                {
                    openOptions &&     <div className='option'>
                    <div className='optionItem'>
                        <span className='optionText'>Adult</span>
                        <div className='.optionCounter'>
                        <button className='optionCounterButton' disabled={options.adult <= 1} onClick={()=> handleOption("adult" , "d")}>-</button>
                        <span className='optionCounterNumber'>{options.adult}</span>
                        <button className='optionCounterButton' onClick={()=> handleOption("adult" , "i")}>+</button>
                        </div>  
                    </div>
                    <div className='optionItem'>
                        <span className='optionText'>Childern</span>
                        <div className='.optionCounter'>
                        <button className='optionCounterButton' disabled={options.children <= 1} onClick={()=> handleOption("children" , "d")}>-</button>
                        <span className='optionCounterNumber'>{options.children}</span>
                        <button className='optionCounterButton' onClick={()=> handleOption("children" , "i")}>+</button>
                        </div>
                    </div>
                    <div className='optionItem'>
                        <span className='optionText'>Room</span>
                        <div className='.optionCounter'>
                        <button className='optionCounterButton' disabled={options.room <= 1} onClick={()=> handleOption("room" , "d")}>-</button>
                        <span className='optionCounterNumber'>{options.room}</span>
                        <button className='optionCounterButton' onClick={()=> handleOption("room" , "i")}>+</button>
                        </div>
                    </div>
                </div>
                }
                </div>
                <div className='headerSearchItem'>
                    <button className='headerBtn' onClick={handleSubmit}>Search</button>
                </div>
            </div>
            </>
        }
    </div>
 </div>
  )
}

export default Header
