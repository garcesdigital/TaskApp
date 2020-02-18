<?php
namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints as Assert;
use AppBundle\Services\Helpers;
use AppBundle\Services\JwtAuth;


class DefaultController extends Controller
{

    public function indexAction(Request $request)
    {
        // replace this example code with whatever you need
        return $this->render('default/index.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.project_dir')).DIRECTORY_SEPARATOR,
        ]);
    }

    public function loginAction(Request $request)
    {
        $helpers = $this->get(Helpers::class);

        //Recibir JSON por POST
        $json = $request->get('json' , null);

        //array a devolver por defecto
        $data = array(
            'stauts' => 'error' ,
            'data' => 'Send JSON via POST'
        );

        if($json != null){

            //me haces el login


            //Convertimos un JSON a un objeto en PHP
            $params = json_decode($json);

            $email = (isset($params->email)) ? $params->email : null;
            $password = (isset($params->password)) ? $params->password : null;
            $getHash = (isset($params->getHash)) ? $params->getHash : null;

            $emailConstraint = new Assert\Email();
            $emailConstraint->message = "This email is not valid";
            $validate_email = $this->get("validator")->validate($email, $emailConstraint);

            // Cifrar la password
            $pwd = hash('sha256', $password);


            if($email != null && count($validate_email) == 0 && $password != null){

                //consultar a la base de datos el email y la contraseña
                $jwt_auth = $this->get(JwtAuth::class);
                if($getHash == null || $getHash == false){
                $signup = $jwt_auth->signup($email , $pwd);
                }else{
                $signup = $jwt_auth->signup($email , $pwd , true);
                }
                return $this->json($signup);

            }else{

            $data = array(
            'stauts' => 'error' ,
            'data' => 'Email or Password Incorrect'
            );

            }


        }
        return $helpers->json($data);


    }


    public function pruebasAction(Request $request)
    {
        $helpers = $this->get(Helpers::class);
        $jwt_auth = $this->get(JwtAuth::class);
        $token = $request->get("authorization" , null);

        if($token && $jwt_auth->checkToken($token) == true){

            $em = $this->getDoctrine()->getManager();
            $userRepo = $em->getRepository('BackendBundle:Users');
            $users = $userRepo->findAll();


        return $helpers->json($users[0]);

        }else{
            return $helpers->json(array(
            'status' => 'error',
            'code' => '400',
            'data' => 'Authorization Not Valid'
            ));
        }



        //var_dump($users[0]);

        /*return new JsonResponse(array(
            'status' => 'success',
            'users' => $users[0]->getName()
        ));*/

        //die();

    }
    
    
    
}
