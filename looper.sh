for f in $(find ./* -name '*.*'); 
  do echo "<p><button class=\"codeDocs\" onclick=\"load('$f')\">📄&ensp;$(basename $f)</button></p>"; 

done

