import { useForm } from "react-hook-form"
import 'bootstrap/dist/css/bootstrap.min.css'
import "../static/App.css"


export default function Inputfield(){
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        reValidateMode: "onSubmit"
      });

      const onSubmit=(data)=>{
        console.log(data);
        
      };

   return (
    <>
    {/* handleSubmit will validate your inputs before invoking onSubmit */}
    <form onSubmit={handleSubmit(onSubmit)}>

      {/* register your input into the hook by invoking the "register" function */}
      {/* include validation with required or other standard HTML validation rules */}
      <input {...register("longurl", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.longurl && <span>This field is required</span>}
      <input type="submit" />
    </form>
    </>
  );
}