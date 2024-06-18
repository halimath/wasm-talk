(module
    ;; Define a function fib to calculate the n-th fibonacci number in a resource wasting way.
    (func $fib (export "fib") (param i64) (result i64)
        ;; if param <= 1
        (i64.lt_u
            (local.get 0)
            (i64.const 3)
        )
        
        (if (result i64)
            (then 
                ;; return 1
                i64.const 1
            )
            (else
                ;; compute fib(param - 1) + fib(param - 2)
                (i64.add
                    (call $fib
                        (i64.sub 
                            (local.get 0)
                            (i64.const 1)
                        )
                    )

                    (call $fib
                        (i64.sub 
                            (local.get 0)
                            (i64.const 2)
                        )
                    )
                )
            )
        )        
    )
    (func $main (export "_start")
        ;; Put 5 on the stack and call fib function
        (call $fib 
            (i64.const 45)
        )

        ;; Discard the result of the computation
        drop
    )    
)