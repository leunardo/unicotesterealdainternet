use db_topquizzes;
delimiter <>
create trigger tg_definir_posicao_top3 before insert on top3  
	for each row
	begin
    
		declare pont1, pont2, pont3 int;
        set pont1 = (select pontuacao where id_quiz = NEW.id_quiz AND posicao = 1);
        set pont2 = (select pontuacao where id_quiz = NEW.id_quiz AND posicao = 2);
        set pont3 = (select pontuacao where id_quiz = NEW.id_quiz AND posicao = 3);
        
        if pont3 = null then 
			set NEW.posicao = 3;
		elseif pont2 = null then 
			set NEW.posicao = 2;
		elseif pont1 = null then
			set NEW.posicao = 1;
		else 
			if pont1 < NEW.posicao then
            
				delete from top3 where id_quiz = NEW.id_quiz AND posicao = 3;
				update top3 set posicao = 2 where id_quiz = NEW.id_quiz AND posicao = 1;
                update top3 set posicao = 3 where id_quiz = NEW.id_quiz AND posicao = 2;
				
				set NEW.posicao = 1;
                
			elseif pont2 < NEW.posicao then
            
				delete from top3 where id_quiz = NEW.id_quiz AND posicao = 3;
				update top3 set posicao = 3 where id_quiz = NEW.id_quiz AND posicao = 2;
				
				set NEW.posicao = 2;
                
			elseif pont3 < NEW.posicao then
            
				delete from top3 where id_quiz = NEW.id_quiz AND posicao = 3;
				set NEW.posicao = 3;
                
			end if;
		end if;
        
    end <>
delimiter ;
