<?php
namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints as Assert;
use BackendBundle\Entity\Users;
use AppBundle\Services\Helpers;
use AppBundle\Services\JwtAuth;


class UserController extends Controller
{

    public function newAction(Request $request)
    {
        $Helpers = $this->get(Helpers::class);
        $json = $request->get('json' , null);
        $params = json_decode($json);

        $data = array(
        	'status' => 'error',
        	'code' => 400,
        	'msg' => 'User not created'
        );

        if($json != null){
        	$createdAt = new \DateTime("now");
        	$role = 'User';
        	$email = (isset($params->email)) ? $params->email : null;
        	$name = (isset($params->name)) ? $params->name : null;
        	$surname = (isset($params->surname)) ? $params->surname : null;
        	$password = (isset($params->password)) ? $params->password : null;

        	$emailConstraint = new Assert\Email();
        	$emailConstraint->message = "This emails is not valid";
        	$validate_email = $this->get("validator")->validate($email, $emailConstraint);

        	if($email != null && count($validate_email) == 0 && $password != null && $name != null && $surname != null){

        	$user = new Users();

        	$user->setCreatedAt($createdAt);
        	$user->setRole($role);
        	$user->setEmail($email);
        	$user->setName($name);
        	$user->setSurname($surname);

          // Cifrar la $password
          $pwd = hash('sha256' , $password);
          $user ->setPassword($pwd);


        	$em = $this->getDoctrine()->getManager();
        	$isset_user = $em->getRepository('BackendBundle:Users')->findBy(array(
        		"email" => $email
        	));

	        	if(count($isset_user) == 0){

	        		$em->persist($user);
	        		$em->flush();

	        		$data = array(
		        	'status' => 'success',
		        	'code' => 200,
		        	'msg' => 'New User created',
		        	'user' => $user
		        	);



	        	}else{

		        	$data = array(
		        	'status' => 'error',
		        	'code' => 400,
		        	'msg' => 'User not created, duplicate'
		        	);

	        	}



        	}
        }

        return $Helpers->json($data);
    }

    public function editAction(Request $request)
    {
        $Helpers = $this->get(Helpers::class);
        $jwt_auth = $this->get(JwtAuth::class);

        $token = $request->get("authorization" , null);
        $authCheck= $jwt_auth->checkToken($token);

        if($authCheck == true){

        		// Entity Manager
	        	$em = $this->getDoctrine()->getManager();
	        	//Conseguir los datos del usuario identificado con el token
	        	$identity = $jwt_auth->checkToken($token, true);
	        	//Conseguir el objeto a actualizar
	        	$user = $em->getRepository('BackendBundle:Users')->findOneBy(array(
	        		'id' => $identity->sub
	        	));
	        	//recoger los datos POST
	        	$json = $request->get('json' , null);
		        $params = json_decode($json);
		        //Array de error por defecto
		        $data = array(
		        	'status' => 'error',
		        	'code' => 400,
		        	'msg' => 'User not updated1'
		        );

		        if($json != null){
		        	$createdAt = new \DateTime("now");
		        	$role = 'User';
		        	$email = (isset($params->email)) ? $params->email : null;
		        	$name = (isset($params->name)) ? $params->name : null;
		        	$surname = (isset($params->surname)) ? $params->surname : null;
		        	$password = (isset($params->password)) ? $params->password : null;

		        	$emailConstraint = new Assert\Email();
		        	$emailConstraint->message = "This emails is not valid";
		        	$validate_email = $this->get("validator")->validate($email, $emailConstraint);

		        	if($email != null && count($validate_email) == 0  && $name != null && $surname != null){

		        	$user->setCreatedAt($createdAt);
		        	$user->setRole($role);
		        	$user->setEmail($email);
		        	$user->setName($name);
		        	$user->setSurname($surname);

              // Cifrar la $password
              if($password != null){
                $pwd = hash('sha256' , $password);
                $user ->setPassword($pwd);
              }



		        	$isset_user = $em->getRepository('BackendBundle:Users')->findBy(array(
		        		"email" => $email
		        	));

			        	if(count($isset_user) == 0 || $identity->email == $email){
			        		$em->persist($user);
			        		$em->flush();

			        		$data = array(
				        	'status' => 'success',
				        	'code' => 200,
				        	'msg' => 'New User updated',
				        	'user' => $user
				        	);



			        	}else{

				        	$data = array(
				        	'status' => 'error',
				        	'code' => 400,
				        	'msg' => 'User not updated'
				        	);

			        	}



		        	}
		        }

        }else{

		        	$data = array(
				        	'status' => 'error',
				        	'code' => 400,
				        	'msg' => 'Authorization not valid'

				        	);

		        }



        return $Helpers->json($data);
    }




}
