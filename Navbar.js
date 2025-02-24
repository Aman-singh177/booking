import React from 'react'

const Navbar = () => {
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <a class="navbar-brand ms-5" href="#">GetRooms</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav mr-end ms-auto me-5"> {/* ms-auto se dono right side mein chipak jaaenge */}
                        
                                <li class="nav-item active">
                                    <a class="nav-link" href="/signup">Register</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/login">Login</a>
                                </li>
                            
                        
                    </ul>
                </div>
            </nav>
        </div>
    )  
}

export default Navbar