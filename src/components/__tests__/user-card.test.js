import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import UserCard from "../user-card";

describe('UserCard', () => {
    const props = {
        id: 'user123',
        userPhoto: 'https://example.com/avatar.jpg',
        firstName: 'John',
        lastName: 'Doe',
        position: 'Software Engineer',
        email: 'john.doe@example.com',
        phoneNumber: '+1-555-555-5555',
        onCardClick: jest.fn(), // Mock function
    }

    test("Renders with correct content", () => {
        render(<UserCard {...props} />);
        
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Software Engineer')).toBeInTheDocument();
        expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
        expect(screen.getByText('+1-555-555-5555')).toBeInTheDocument();
    
        const imgElement = screen.getByRole('img', {name: 'user photo'});
        expect(imgElement).toBeInTheDocument();
        expect(imgElement).toHaveAttribute('src', props.userPhoto);
    });

    test("calls onCardClick when clicked", () => {
        render(<UserCard {...props} />);

        fireEvent.click(screen.getByRole('img'));

        expect(props.onCardClick).toHaveBeenCalledTimes(1);
        expect(props.onCardClick).toHaveBeenCalledWith(props.id);
    })
});