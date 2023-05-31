import { deleteCartItem, getShoppingCart } from "api/cart";
import React, {Fragment, useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toMoneyFormat } from 'utils/utils'
import './index.css'

export default function ShoppingCart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart ? state.cart.getIn(['data', 'cart']) : []);
    const [shoppingCart, setShoppingCart] = useState({});
    const [selectedClasses, setSelectedClasses] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [checkBoxes, setCheckBoxes] = useState({});
    const [errorLoading, setErrorLoading] = useState(false);
    const loading = useSelector((state) => state.uiElements.getIn(['loadingScreen']));


    useEffect(() => {
        loadData();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadData = () => {
        setErrorLoading(false);
        getShoppingCart(dispatch, (status, response) => {
            if(status){
                parseShoppingCart(response);
            }else{
                setErrorLoading(true);
            }
        });
    }

    const parseShoppingCart =(cart) => {
        const cartGroupedByTeacher = {};

        cart.forEach(item => {
            if(!cartGroupedByTeacher[item.teacherId]){
                cartGroupedByTeacher[item.teacherId] = {
                    teacher: item.teacherName,
                    photo: item.photo,
                    classes: []
                };
            }

            cartGroupedByTeacher[item.teacherId].classes.push({...item, enrollees: item.enrollees !== "null" ? JSON.parse(item.enrollees) : null});
        });
        
        setShoppingCart(cartGroupedByTeacher);
    }

    const onClickCheckBox = async (e, source, cartItem, teacherId) => {
        const classes = [...selectedClasses];
        switch(source){
            case 'teacher': 
                await shoppingCart[cartItem].classes.forEach(item => {
                    const enrolleesCount = item.enrollees ? item.enrollees.length : 1;
                    if(e.target.checked){
                        if(classes.findIndex(c => c.classId === item.classId) === -1){
                            classes.push(item);
                            setCartTotal((prevState) => (
                                parseFloat(prevState) + (parseFloat(item.price)*enrolleesCount)
                            ));
                            setCheckBoxes((prevState) => ({
                                ...prevState,
                                [item.classId]: true,
                                [cartItem]: true,
                                all: classes.length === cart.length
                            }));
                        }
                    }else{
                        const idx = classes.findIndex(c => c.classId === item.classId);
                        classes.splice(idx, 1);
                        setCartTotal((prevState) => (
                            parseFloat(prevState) - (parseFloat(item.price)*enrolleesCount)
                        ));
                        setCheckBoxes((prevState) => ({
                            ...prevState,
                            [item.classId]: false,
                            [cartItem]: false,
                            all: classes.length === cart.length
                        }));
                    }
                });
                setSelectedClasses(classes);
                break;
            case 'class':
                const enrolleesCount = cartItem.enrollees ? cartItem.enrollees.length : 1;
                const idx = classes.findIndex(c => c.classId === cartItem.classId);

                if(idx === -1){
                    classes.push(cartItem);
                    setCartTotal((prevState) => (
                        parseFloat(prevState) + (parseFloat(cartItem.price)*enrolleesCount)
                    ));
                }else{
                    classes.splice(idx, 1);
                    setCartTotal((prevState) => (
                        parseFloat(prevState) - (parseFloat(cartItem.price)*enrolleesCount)
                    ));
                }

                await setSelectedClasses(classes);

                await setCheckBoxes((prevState) => ({
                    ...prevState,
                    [e.target.name]: idx === -1,
                    [teacherId]: isCheckedTeacher(teacherId, classes),
                    all: classes.length === cart.length
                }));
                break;
            case 'all': 
                const keys = Object.keys(shoppingCart);
                keys.forEach(teacherId => {
                    shoppingCart[teacherId].classes.forEach(item => {
                        const enrolleesCount = item.enrollees ? item.enrollees.length : 1;
                        if(e.target.checked){
                            if(classes.indexOf(item.classId) === -1){
                                classes.push(item);
                                setCartTotal((prevState) => (
                                    parseFloat(prevState) + (parseFloat(item.price)*enrolleesCount)
                                ));
                                setCheckBoxes((prevState) => ({
                                    ...prevState,
                                    [teacherId]: true,
                                    [item.classId]: true,
                                    all: true
                                }));
                            }
                        }else{
                            classes.splice(0, classes.length);
                            setCartTotal(0);
                            setCheckBoxes((prevState) => ({
                                ...prevState,
                                [teacherId]: false,
                                [item.classId]: false,
                                all: false
                            }));
                        }
                    });
                });
                await setSelectedClasses(classes);
                break;
            default:
        }
    }

    const isCheckedTeacher = (itemId, classes) => {
        const teacherClasses = shoppingCart[itemId].classes.map(item => item.classId);
        const filtered = classes.filter(item => teacherClasses.indexOf(item.classId) > -1);
        return teacherClasses.length === filtered.length
    }

    const removeFromCart = async(classId) => {
        const index = cart.findIndex(item => item.classId === classId);
        const {cartId} = cart[index];
        deleteCartItem(dispatch, {cartId}, (status) => {
            if(status){
              toast.success('Item has been removed from cart.');
              loadData();
            }else{
              toast.error('Failed removing item from cart. Please try again later.');
            }
        });
    }

    const handleCheckout = () => {
        navigate(`/checkout`, { state: { classes: selectedClasses } });
        console.log('selected', selectedClasses)
    }

  return (
    <Fragment>
        <div className="cart">
            <div className="text-center data-loading" style={{display: loading ? "block" : "none"}}>
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <div className="loading-text">Loading Shopping Cart ...</div>
            </div>
            <div className="text-center" style = {{display: (!loading && ((Object.keys(shoppingCart).length < 1) || !!errorLoading)) ? 'block': 'none'}}>
                {(Object.keys(shoppingCart).length < 1 && !errorLoading) && <div className="no-data">No Data Available</div>}
                {!!errorLoading && <div className="no-data error">
                    There was an error loading the data. <br/>
                    <button className="btn btn-link" onClick={loadData}>Reload</button>
                </div>}
            </div>
            {!loading && <div style={{paddingBottom: '100px'}}>
                {Object.keys(shoppingCart).map(item => 
                (<div className="card mb-2">
                    <div className="card-header d-flex">
                        <div className="checkbox checkbox-info">
                            <input
                                type="checkbox"
                                id={item}
                                name={item}
                                onChange={(e) => onClickCheckBox(e, 'teacher', item)}
                                checked={checkBoxes[item]}
                            />
                            <label htmlFor={item}>
                                {" "} <span className="ml-3">
                                        <img className="mr-2" style={{width: '27px', height: '100%', objectFit: 'contain', borderRadius: '50%', border: '1px lightgray solid'}} alt="img" src={shoppingCart[item].photo ? shoppingCart[item].photo : '../assets/images/image-placeholder.jpg'}/>
                                        {shoppingCart[item].teacher}
                                    </span>{" "}
                            </label>
                        </div>
                    </div>
                    <div class="card-body">
                        {shoppingCart[item].classes.map(classDetails => 
                        (<div>
                            <div className="row justify-content-between">
                                <div 
                                    className="d-flex col-7" style={{maxWidth: '50%'}}
                                    
                                >
                                    <div className="checkbox checkbox-info mr-3 align-items-center d-flex">
                                        <input
                                            type="checkbox"
                                            id={classDetails.classId}
                                            name={classDetails.classId}
                                            onClick={(e) => onClickCheckBox(e,'class', classDetails, item)}
                                            checked={checkBoxes[classDetails.classId]}
                                        />
                                        <label htmlFor={classDetails.classId}>
                                            {" "}
                                        </label>
                                    </div>
                                    <img role="button"
                                        onClick={() => navigate(`/class/enroll/${classDetails.classId}`)}
                                        style={{width: '40px', height: '100%', objectFit: 'contain'}} alt="img" src={classDetails.thumbnailImage ? classDetails.thumbnailImage : '../assets/images/image-placeholder.jpg'}/>
                                    <div className="ml-2"
                                        role="button"
                                        onClick={() => navigate(`/class/enroll/${classDetails.classId}`)}>
                                        {/* <img height="100%" src="https://tagprosbucket.s3-ap-southeast-1.amazonaws.com/xH6Sz9xtdbbEaqrR72Jse.jpg" /> */}
                                        <h5 className="mb-0">{classDetails.title}</h5>
                                        <div style={{fontSize: '12px'}}>
                                            <span className="mr-1">•{classDetails.categoryCode}/{classDetails.subCategoryCode}</span> 
                                            <span className="mr-1">•6 sessions</span> 
                                            <span className="mr-1">•{classDetails.ageCategory}</span>
                                        </div>
                                        {classDetails.enrollees && <div style={{fontSize: '14px'}}>
                                            {classDetails.enrollees.map(item => (<span className="mr-1 badge badge-info">{item.nickname}</span>))}
                                        </div>}
                                    </div>
                                </div>
                                <div className="col-2 align-items-center d-flex">{toMoneyFormat(classDetails.price, classDetails.currency)}</div>
                                <div className="col-2 align-items-center d-flex">x {classDetails.enrollees ? classDetails.enrollees.length : 1}</div>
                                <button className="btn btn-link col-1" style={{color:'red'}} onClick={() => removeFromCart(classDetails.classId, item)}>
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                            <hr style={{marginLeft: '30px'}}/>
                        </div>))}
                    </div>
                </div>))}
            </div>}
            <div className="footer">
                <div className="d-flex justify-content-end align-items-center">
                    <span><b>Total Item ({selectedClasses.length} item/s): <span className="price">{toMoneyFormat(cartTotal, selectedClasses.find(({currency})=>(currency.trim().length))?.currency)}</span></b></span>
                </div>
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                    <div className="checkbox checkbox-info">
                        <input
                            type="checkbox"
                            id="allCheck"
                            name="allCheck"
                            onChange={(e) => onClickCheckBox(e,'all')}
                            checked={checkBoxes.all}
                        />
                        <label htmlFor="allCheck">
                            {" "} <span>Select All ({cart.length}) </span>{" "}
                        </label>
                    </div>
                    <div>
                        <button className="btn btn-primary btn-lg" onClick={handleCheckout}>Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
  );
}