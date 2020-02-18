<?php
namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints as Assert;
use BackendBundle\Entity\Task;
use AppBundle\Services\Helpers;
use AppBundle\Services\JwtAuth;

class TaskController extends Controller{

    //NUEVA TAREA
  public function newAction(Request $request, $id = null){
    $helpers = $this->get(Helpers::class);
    $jwt_auth = $this->get(JwtAuth::class);
    $token = $request->get("authorization", null);
    $authCheck = $jwt_auth->checkToken($token);

    if($authCheck){
      $identity = $jwt_auth->checkToken($token, true);
      $json = $request->get("json",null);
      if($json != null){
        $params = json_decode($json);
        $createdAt = new\DateTime('now');
        $updatedAt = new\DateTime('now');
        $user_id = ($identity->sub != null) ? $identity->sub : null;
        $title= (isset($params->title)) ? $params->title : null;
        $description= (isset($params->description)) ? $params->description : null;
        $status= (isset($params->status)) ? $params->status : null;

        if($user_id != null && $title != null){
          //Crear la tarea
          $em = $this->getDoctrine()->getManager();
          $user = $em->getRepository('BackendBundle:Users')->findOneBy(array(
            "id" => $user_id
          ));
          if($id == null){
            $task = new Task();
            $task->setUser($user);
            $task->setTitle($title);
            $task->setDescription($description);
            $task->setStatus($status);
            $task->setCreatedAt($createdAt);
            $task->setUpdatedAt($updatedAt);
            $em->persist($task);
            $em->flush();
            $data = array(
              "status" => "success",
              "code" => "200",
              "data"=> $task
            );
          }else{
            $task = $em->getRepository('BackendBundle:Task')->findOneBy(array(
              "id" => $id
            ));
            if(isset($identity->sub) && $identity->sub == $task->getUser()->getId())
            {

              $task->setTitle($title);
              $task->setDescription($description);
              $task->setStatus($status);
              $task->setUpdatedAt($updatedAt);
              $em->persist($task);
              $em->flush();

            }else{

              $data = array(
                "status" => "error",
                "code" => "400",
                "msg"=> "Tarea no editada , no eres el dueño de la tarea"
              );

            }
          }

        }else{

          $data = array(
            "status" => "error",
            "code" => "400",
            "msg"=> "Tarea no creada, fallo en la validacion"
          );

        }

      }else{
        $data = array(
          "status" => "error",
          "code" => "400",
          "msg"=> "Tarea no creada"
        );
      }

      $data = array(
        "status" => "success",
        "code" => "200",
        "msg"=> "Mensaje"
      );

    }else{

      $data = array(
        "status" => "error",
        "code" => "400",
        "msg"=> "Authorization not valid"
      );

    }

    return $helpers->json($data);



  }

    //MOSTRAR TODAS LAS TAREAS
  public function tasksAction(Request $request ){

      $helpers = $this->get(Helpers::class);
      $jwt_auth = $this->get(JwtAuth::class);

      $token = $request->get("authorization", null);
      $authCheck = $jwt_auth->checkToken($token);

      if($authCheck){
      $identity = $jwt_auth->checkToken($token, true);
      //$json = $request->get("json",null);
      $em = $this->getDoctrine()->getManager();

      $dql = "SELECT t FROm BackendBundle:Task t WHERE t.user = {$identity->sub} ORDER BY t.id DESC";
      $query = $em->createQuery($dql);
      $page = $request->query->getInt('page',1);
      $paginator = $this->get('knp_paginator');
      $items_per_page = 10;
      $pagination = $paginator->paginate($query,$page,$items_per_page);
      $total_items_count = $pagination->getTotalItemCount();

          
          
        $data = array(
          "status" => "success",
          "code" => "200",
          "total_items_count"=> $total_items_count,
          "page_actual" => $page,
          "items_per_page" => $items_per_page,
          "total_page"=> ceil($total_items_count / $items_per_page),
          "data" => $pagination
        );

      }else{
        $data = array(
          "status" => "error",
          "code" => "400",
          "msg"=> "Authorization not valid"
        );
      }
      
      return $helpers->json($data);

  }
    
    //VER DETALLE DE UNA TAREA
    public function taskAction(Request $request, $id = null){
        $helpers = $this->get(Helpers::class);
        $jwt_auth = $this->get(JwtAuth::class);
        
        $token = $request->get('authorization' , null);
        $authCheck = $jwt_auth->checkToken($token);
        
        if($authCheck){
            $identity = $jwt_auth->checkToken($token, true);
            
            $em = $this->getDoctrine()->getManager();
            
            $task = $em->getRepository('BackendBundle:Task')->findOneBy(array(
            'id' => $id
            ));
            if($task && is_object($task) && $identity->sub == $task->getUser()->getId()){
                $data = array(
                  "status" => "success",
                  "code" => "200",
                  "data"=> $task
                ); 
            }else{
                $data = array(
                  "status" => "error",
                  "code" => "404",
                  "msg"=> "Task Not Found"
                ); 
            }
            
        }else{
           $data = array(
          "status" => "error",
          "code" => "400",
          "msg"=> "Authorization not valid"
        ); 
        }
        
        return $helpers->json($data);
        
    }
    
    //BUSCAR UNA TAREA
    public function searchAction(Request $request, $search = null){
        $helpers = $this->get(Helpers::class);
        $jwt_auth = $this->get(JwtAuth::class);
        
        $token = $request->get('authorization' , null);
        $authCheck = $jwt_auth->checkToken($token);    
        if($authCheck){
            $identity = $jwt_auth->checkToken($token, true);
            $em = $this->getDoctrine()->getManager();
            //filtro
            $filter = $request->get('filter' , null);
            if(empty($filter)){
                $filter = null;
            }elseif($filter == 1){
                $filter = 'new';
            }elseif($filter == 2){
                $filter = 'todo';
            }else{
                $filter = 'finished';
            }
            
            //orden
            $order = $request->get('order', null);
            if(empty($order) || ($order == 2)){
               $order = 'DESC'; 
            }else{
               $order = 'ASC'; 
            }
            
            //Busqueda
            if($search != null)
            {
                $dql = "SELECT t FROM BackendBundle:Task t "
                        ."WHERE t.user = $identity->sub AND "
                        ."(t.title LIKE :search OR t.description LIKE :search) ";
            }else
            {
                $dql ="SELECT t FROM BackendBundle:Task t "
                      ."WHERE t.user = $identity->sub";
            }
            //SET FILTER
            if($filter != null)
            {
                $dql .= "AND t.status = :filter";
            }
            //SET ORDER
            $dql .=" ORDER BY t.id $order";
            
            //QUERY
            
            // SET PARAMETER FILTER
            $query = $em->createQuery($dql);
            if($filter != null)
            {
                     $query->setParameter('filter' , "$filter");
            }
                
            
            //SET PARAMETER SEARCH
            
            if(!empty($search)){
                $query->setParameter('search', "%$search%");
            }
            
            //CONSEGUIR RESULTADO DE LA QUERY
            
            $tasks = $query->getResult();
            
            $data = array(
            "status" => "success",
            "code" => "200",
            "data"=> $tasks
            );
            
        }else{
            $data = array(
          "status" => "error",
          "code" => "400",
          "msg"=> "Authorization not valid"
        ); 
        }
        return $helpers->json($data);
    }
    
    //ELIMINAR UNA TAREA
    public function removeAction(Request $request, $id = null){
        $helpers = $this->get(Helpers::class);
        $jwt_auth = $this->get(JwtAuth::class);
        
        $token = $request->get('authorization' , null);
        $authCheck = $jwt_auth->checkToken($token);
        
        if($authCheck){
            $identity = $jwt_auth->checkToken($token, true);
            
            $em = $this->getDoctrine()->getManager();
            
            $task = $em->getRepository('BackendBundle:Task')->findOneBy(array(
            'id' => $id
            ));
            if($task && is_object($task) && $identity->sub == $task->getUser()->getId()){
                
                //Borrar el objeto
                $em->remove($task);
                //Borrar el registro de la tabla
                $em->flush();
                
                $data = array(
                  "status" => "success",
                  "code" => "200",
                  "data"=> $task
                ); 
            }else{
                $data = array(
                  "status" => "error",
                  "code" => "404",
                  "msg"=> "Task Not Found"
                ); 
            }
            
        }else{
           $data = array(
          "status" => "error",
          "code" => "400",
          "msg"=> "Authorization not valid"
        ); 
        }
        
        return $helpers->json($data);
        
    }
    

}
