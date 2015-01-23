


    function pauseRendering()
    {
      id = requestAnimationFrame(render);
      cancelAnimationFrame(id);
    }
