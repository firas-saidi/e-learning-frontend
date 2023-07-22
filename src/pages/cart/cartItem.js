import React from 'react';
const styles = {
    images: {
        width: '80px'
    },
    btnDelete: {
        color: 'white',
        backgroundColor: '#072a48',
        border: 'solid',
        borderColor: '#072a48',
        width: '30px',
        cursor: 'pointer',
        borderWidth: '0.1ex'
    }
}

const CartItem = (props) => {
    const { images, btnDelete } = styles
    const { name, price, image } = props.tutorial
    console.log(props.tutorial)
    return (
        <tr>
            <td>
                <table>
                    <tbody>
                        <tr>
                            <td className="withoutborder"><img style={images} src={image} alt={name} /></td>
                            <td className="withoutborder" style={{verticalAlign: 'bottom'}}><p><b>{name}</b></p></td>
                        </tr>
                    </tbody>
                </table>
            </td>
            <td style={{verticalAlign: 'middle'}}>
                <p><b>{price} TND</b></p>
            </td>
            <td style={{verticalAlign: 'middle'}}> 
                <p><button style={btnDelete} onClick={props.deleteitem}>x</button></p>
            </td>
        </tr>
    );
}


export default CartItem;





   // if (this.state.cartItems) {
        //     var cartIDs = JSON.parse(localStorage["cart"]);
        //     const updatedcartIds = cartIDs.filter(id => id !== this.props.tutorial._id);
        //     this.setState(prevState => ({...prevState, cartItems: updatedcartIds}) , () => {
        //         localStorage.setItem('cart', JSON.stringify(updatedcartIds));
        //     });
        //     console.log()
        // }





    // handleDelete = () => {
    //     if (this.state.cartItems) {
    //         var json = JSON.parse(localStorage["cart"]);
    //         for (let i = 0; i < json.length; i++)
    //             if (json[i] !== this.props.tutorial._id) {
    //                 const id = json.splice(i, 1);
    //                 if (id !== this.state.NewCart[i]) {
    //                     const NewCart = [...this.state.NewCart, id];
    //                     localStorage.setItem('cart', JSON.stringify(NewCart));
    //                     return NewCart
    //                 }
    //             }
    //     }
    // }
