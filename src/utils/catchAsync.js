// Esta función recibe tu controlador, lo ejecuta, y si algo falla, llama a next() por mi.
export const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};