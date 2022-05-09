import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App', ()=> {

  test("App contains filters and all filter has focus on mount", () => {
    render(<App />);
    const allFilter = screen.getByText("All");
    expect(allFilter).toHaveFocus();
  });
  
  test("Form submission should not call `add` method if input field is empty", () => {
    const handleSubmit = jest.fn() 
    render(<App onSubmit={handleSubmit} />); 
    const btn = screen.getByTestId("submit");
    fireEvent.click(btn);
    expect(handleSubmit).not.toHaveBeenCalled(); 
  });
  
  // get same keys warning since original array is not empty in app
  /*
  jest.mock('nanoid', () => {
    return { nanoid: () => '1234' }
  });
  */
  
  test("New Todo is in the document after submit button is clicked", () => {
    render(<App  />)
    const input = screen.getByPlaceholderText("add details");
    const btn = screen.getByTestId("submit");
  
    fireEvent.change(input, { target: { value: "grocery" } });
    fireEvent.click(btn);
  
    const newTodo = screen.getByText(/grocery/);
    expect(newTodo).toBeInTheDocument();
  });

  test("3 todos after submit button is clicked", () => {
    render(<App  />)
    const input = screen.getByPlaceholderText("add details");
    const btn = screen.getByTestId("submit");
  
    fireEvent.change(input, { target: { value: "grocery" } });
    fireEvent.click(btn);
  
    const newTodos = screen.getAllByRole("checkbox");
    expect(newTodos.length).toBe(3);
  });
  
  test("Input cleared on form submission", () => {
    render(<App  />)
    const input = screen.getByPlaceholderText("add details");
    const btn = screen.getByTestId("submit");
  
    fireEvent.change(input, { target: { value: "grocery" } });
    fireEvent.click(btn);
    //expect().toBeInTheDocument()
    expect(input).toHaveValue("");
  });
  
  test("Input onchange handler works", () => {
    const handleSubmit = jest.fn() 
    render(<App onSubmit={handleSubmit} />)
    const input = screen.getByPlaceholderText(/add details/i);
  
    fireEvent.change(input, { target: { value: "grocery" } });
  
    expect(input.value).toBe("grocery");  
  });

  test("Delete all button is clicked and disappears from dom", () => {
    const handleDeleteAll = jest.fn();
    render(<App onClick={handleDeleteAll} />)
    
    // have to click completed filter
    const completedFilter = screen.getByText(/Completed/i);
    fireEvent.click(completedFilter);
    
    const deleteBtn = screen.getByText(/delete all/);

    fireEvent.click(deleteBtn);
  
    expect(deleteBtn).not.toBeInTheDocument();
  });

  test("Delete button for todo", () => {
    const handleSubmit = jest.fn() 
    render(<App onSubmit={handleSubmit} />)

    const completedFilter = screen.getByText(/Completed/i);
    fireEvent.click(completedFilter);

    const deleteBtn = screen.getByTestId("todo-delete");
  
    fireEvent.click(deleteBtn);
  
    expect(deleteBtn).not.toBeInTheDocument();  
  });

  test("handleChecked function", ()=> {
    render(<App />)
    const allFilter = screen.getByText(/All/)
    fireEvent.click(allFilter)

    const input = screen.getByPlaceholderText(/add details/i);
  
    fireEvent.change(input, { target: { value: "grocery" } });

    const btn = screen.getByTestId("submit");

    fireEvent.click(btn);

    const newTodo = screen.getByText(/grocery/)

    expect(newTodo).toBeInTheDocument()

  })

  test("active filter", ()=> {
    render(<App />)
    const allFilter = screen.getByText(/Active/)
    fireEvent.click(allFilter)

    const howManyTodos = screen.getAllByRole('checkbox');

    expect(howManyTodos.length).toBe(1);

  })

  test("completed filter", ()=> {
    render(<App />)
    const completedFilter = screen.getByText(/Completed/)
    fireEvent.click(completedFilter)

    const howManyTodos = screen.getAllByRole('checkbox');

    expect(howManyTodos.length).toBe(1);

    const deleteAllButton = screen.getByTestId('delete');

    expect(deleteAllButton).toBeInTheDocument();

  })

})


/*

have to import submit function to be able to mock it?


jest.mock('nanoid', () => {
  return { nanoid: () => '1234' }
});

it("submit event called", () => {
  const onSubmit = jest.fn();
  render(<App onSubmit={onSubmit} />);
 
  fireEvent.click(screen.getByText(/add/i));

  expect(onSubmit).toBeCalled();
});
*/

/*

test("Todo is marked completed on checkbox click", () => {
    render(<App />)
    const checkbox = screen.getAllByRole("checkbox");

    const isChecked = checkbox[0].checked; 
    
    fireEvent.click(checkbox[0])

    expect(checkbox[0].checked).toBe(!isChecked)
})

checked value is passed as prop and I can't be directly flip the value of the prop

*/